import { Router } from "express";
import {
  createClient,
  deleteClient,
  renderClient,
  renderClientEdit,
  editClient,
} from "../controllers/clients.controllers";

const router = Router();

// Render all tasks
router.get("/clients/", renderClient);

router.post("/clients/add", createClient);

router.get("/clients/:id/edit", renderClientEdit);

router.post("/clients/:id/edit", editClient);

router.get("/clients/:id/delete", deleteClient);

export default router;
