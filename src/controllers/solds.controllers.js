import Sold from "../model/Sold";
import Product from "../model/Product";
import Client from "../model/Client";
import Bills from "../model/Bills";
import PDFDocument from "pdfkit";

export const renderSold = async (req, res) => {
  try {
    const solds = await Sold.find().populate('product').lean();
    const products = await Product.find().lean(); // Obtener los productos registrados
    const clients = await Client.find().lean(); // Obtener los clientes registrados
    res.render("solds/index", {
      solds,
      products,
      clients,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderSoldComplete = async (req, res) => {
  try {
    const solds = await Sold.find().populate('product').lean();
    const products = await Product.find().lean(); // Obtener los productos registrados
    const clients = await Client.find().lean(); // Obtener los clientes registrados
    res.render("solds/sold", {
      solds,
      products,
      clients,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createSold = async (req, res, next) => {
  try {
    // Find the latest sold
    const lastSold = await Sold.findOne().sort({ createdAt: -1 });

    // Calculate the new name based on the last sold name
    const newSoldName = lastSold ? parseInt(lastSold.name) + 1 : "100000001";

    // Create the new sold
    const sold = new Sold({
      ...req.body,
      prevSold: lastSold ? lastSold._id : null,
      name: newSoldName.toString(),
    });

    await sold.save();
    res.redirect("/solds/");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderSoldEdit = async (req, res, next) => {
  try {
    const sold = await Sold.findById(req.params.id).populate('product').lean();
    const products = await Product.find().lean(); // Obtener los productos registrados
    res.render("solds/edit", {
      sold,
      products, // Enviar los productos a la vista
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const editSold = async (req, res, next) => {
  const { id } = req.params;
  const { product, description, amount } = req.body;
  await Sold.updateOne({ _id: id }, { product, description, amount });
  res.redirect("/solds/");
};

export const deleteSold = async (req, res, next) => {
  let { id } = req.params;
  await Sold.remove({ _id: id });
  res.redirect("/solds/");
};

export const clearSolds = async (req, res) => {
  try {
    await Sold.deleteMany({});
    res.redirect("/solds/");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al eliminar los productos vendidos' });
  }
};

export const generatePDF = async (req, res) => {
  const doc = new PDFDocument({ bufferPage: true });

  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': 'factura.pdf'
  });

  // Define las opciones de la tabla
  const options = {
    columnSpacing: 20,
    columns: [
      { header: 'Nombre', key: 'name', width: 150 },
      { header: 'Descripción', key: 'description', width: 200 },
      { header: 'Cantidad', key: 'quantity', width: 100 },
      { header: 'Precio', key: 'price', width: 100 }
    ]
  };

  const tabla = await Sold.find().lean(); // Obtener los productos registrados
  const data = tabla.map((product) => {
    return {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price
    };
  });

  let total = 0;

  const totalAmount = tabla.reduce((total, sold) => total + sold.amount, 0);

  doc.text('Facturación de la tienda', { align: 'center', underline: true });
  doc.moveDown();

  doc.on('data', (data) => { stream.write(data) });
  doc.on('end', () => { stream.end() });

  data.forEach((row) => {
    const rowData = options.columns.map(column => row[column.key]);
    doc.moveDown().text(rowData.join(' | '));
  });

  doc.moveDown().text(`Total a pagar: ${totalAmount}`)

  doc.end();
}

export const generateBill = async (req, res) => {
  try {
    const solds = await Sold.find().lean();
    const totalAmount = solds.reduce((total, sold) => total + sold.amount, 0);

    const bill = new Bills({ amount: totalAmount });

    await bill.save();

    await generatePDF(req, res);

    await clearSolds(req, res);

    res.redirect("/solds/");
  } catch (error) {
    console.error(error);
    return res.render("error", { errorMessage: error.message });
  }
};

