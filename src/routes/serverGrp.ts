import { Router } from "express";
import { ServerGrpController } from "../controller/ServerGrpController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all serverGrps if isAdmin or pass the service in the query
router.get("/", [authentication], ServerGrpController.getServerGrps);

// Get one serverGrp
router.get("/:id", [authentication, authorization], ServerGrpController.getOneById);

// Create a new serverGrp
router.post("/new", [authentication, authorization], ServerGrpController.newServGrp);

// Edit a serverGrp
router.patch("/:id", [authentication, authorization], ServerGrpController.editServGrp);

// Delete a serverGrp
router.delete("/:id", [authentication, authorization], ServerGrpController.deleteServGrp);

export default router;