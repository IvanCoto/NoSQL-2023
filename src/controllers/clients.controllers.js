import Client from "../model/Client";

export const renderClient = async (req, res) => {
  try {
    const clients = await Client.find().lean();
    res.render("clients/index", {
      clients,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createClient = async (req, res, next) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.redirect("/clients/");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

export const renderClientEdit = async (req, res, next) => {
  const client = await Client.findById(req.params.id).lean();
  res.render("clients/edit", { client });
};

export const editClient = async (req, res, next) => {
  const { id } = req.params;
  await Client.updateOne({ _id: id }, req.body);
  res.redirect("/clients/");
};

export const deleteClient = async (req, res, next) => {
  let { id } = req.params;
  await Client.remove({ _id: id });
  res.redirect("/clients/");
};
