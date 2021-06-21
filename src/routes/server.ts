import { Router } from "express";
import { ServerController } from "../controller/ServerController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all servers
router.get("/", [authentication, authorization], ServerController.listAll);

// Get all servers with given serverGrp
router.post("/", [authentication], ServerController.getByServGrp);

// Get one server
router.get("/:id", [authentication, authorization], ServerController.getOneById);

// Create a new server
router.post("/new", [authentication, authorization], ServerController.newServer);

// Edit a server
router.patch("/:id", [authentication, authorization], ServerController.editServer);

// Delete a server
router.delete("/:id", [authentication, authorization], ServerController.deleteServer);

export default router;