import { Router } from "express";
import { AlertController } from "../controller/AlertController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all alerts
router.get("/", [authentication], AlertController.getAlerts);

// Get one alert
router.get("/:id", [authentication], AlertController.getOneById);

// Create a new alert
router.post("/new", [authentication, authorization], AlertController.newAlert);

// Edit a alert
router.patch("/:id", [authentication, authorization], AlertController.editAlert);

// Delete a alert
router.delete("/:id", [authentication, authorization], AlertController.deleteAlert);

export default router;