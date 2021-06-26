import { Router } from "express";
import { ServiceController } from "../controller/ServiceController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all services
router.get("/", [authentication], ServiceController.getServices);

// Get one service
router.get("/:id", [authentication], ServiceController.getOneById);

// Create a new service
router.post("/new", [authentication, authorization], ServiceController.newService);

// Edit a service
router.patch("/:id", [authentication, authorization], ServiceController.editService);

// Delete a service
router.delete("/:id", [authentication, authorization], ServiceController.deleteService);

export default router;