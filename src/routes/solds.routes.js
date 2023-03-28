import { Router } from "express";
import {
  createSold,
  deleteSold,
  renderSold,
  renderSoldEdit,
  editSold,
  renderSoldComplete, 
  clearSolds,
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

export default router;
