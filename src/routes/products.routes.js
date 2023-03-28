import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  renderProduct,
  renderProductEdit,
  editProduct,
} from "../controllers/products.controllers";

const router = Router();

// Render all tasks
router.get("/products/", renderProduct);

router.post("/products/add", createProduct);

router.get("/products/:id/edit", renderProductEdit);

router.post("/products/:id/edit", editProduct);

router.get("/products/:id/delete", deleteProduct);

export default router;
