import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";

import indexRoutes from "./routes/tasks.routes";
import clientRoutes from "./routes/clients.routes";
import productRoutes from "./routes/products.routes";
import soldRoutes from "./routes/solds.routes";
import providerRoutes from "./routes/providers.routes";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
    helpers: {
      eq: (value1, value2) => {
        return value1 === value2;
      },
    },
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(productRoutes);
app.use(soldRoutes);
app.use(providerRoutes);

// public route
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
