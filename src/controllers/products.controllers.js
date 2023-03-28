import Product from "../model/Product";

export const renderProduct = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("products/index", {
      products,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect("/products/");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderProductEdit = async (req, res, next) => {
  const product = await Product.findById(req.params.id).lean();
  res.render("products/edit", { product });
};

export const editProduct = async (req, res, next) => {
  const { id } = req.params;
  await Product.updateOne({ _id: id }, req.body);
  res.redirect("/products/");
};

export const deleteProduct = async (req, res, next) => {
  let { id } = req.params;
  await Product.remove({ _id: id });
  res.redirect("/products/");
};
