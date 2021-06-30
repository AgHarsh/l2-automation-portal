import { Router } from "express";
import { ServerController } from "../controller/ServerController";
import { DBController } from "../controller/DBController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all servers if isAdmin or pass the serverGrp in query
router.get("/", [authentication], ServerController.getServers);

// Get one server
router.get("/:id", [authentication, authorization], ServerController.getOneById);

// Create a new server
router.post("/new", [authentication, authorization], ServerController.newServer);

// Create multiple servers, servergrps, services
router.post("/newadmin", [authentication, authorization], DBController.newServers);

// Edit a server
router.patch("/:id", [authentication, authorization], ServerController.editServer);

// Delete a server
router.delete("/:id", [authentication, authorization], ServerController.deleteServer);

export default router;