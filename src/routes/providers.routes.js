import { Router } from "express";
import {
  createProvider,
  deleteProvider,
  renderProvider,
  renderProviderEdit,
  editProvider,
} from "../controllers/providers.controllers";

const router = Router();

// Render all tasks
router.get("/providers/", renderProvider);

router.post("/providers/add", createProvider);

router.get("/providers/:id/edit", renderProviderEdit);

router.post("/providers/:id/edit", editProvider);

router.get("/providers/:id/delete", deleteProvider);

export default router;
