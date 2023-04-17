import { Router } from "express";
import {
  createSold,
  deleteSold,
  renderSold,
  renderSoldEdit,
  editSold,
  renderSoldComplete, 
  clearSolds,
  generateBill,
} from "../controllers/solds.controllers";

const router = Router();

// Render all tasks
router.get("/solds/", renderSold);

router.post("/solds/add", createSold);

router.get("/solds/:id/edit", renderSoldEdit);

router.post("/solds/:id/edit", editSold);

router.get("/solds/:id/delete", deleteSold);

router.get("/solds/clear", clearSolds);

router.get("/solds/sold", renderSoldComplete);

router.post("/solds/generate-bill", generateBill);

export default router;
