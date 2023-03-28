import Provider from "../model/Provider";

export const renderProvider = async (req, res) => {
  try {
    const providers = await Provider.find().lean();
    res.render("providers/index", {
      providers,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createProvider = async (req, res, next) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.redirect("/providers/");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderProviderEdit = async (req, res, next) => {
  const provider = await Provider.findById(req.params.id).lean();
  res.render("providers/edit", { provider });
};

export const editProvider = async (req, res, next) => {
  const { id } = req.params;
  await Provider.updateOne({ _id: id }, req.body);
  res.redirect("/providers/");
};

export const deleteProvider = async (req, res, next) => {
  let { id } = req.params;
  await Provider.remove({ _id: id });
  res.redirect("/providers/");
};
