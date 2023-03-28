import Sold from "../model/Sold";
import Product from "../model/Product";
import Client from "../model/Client";

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

