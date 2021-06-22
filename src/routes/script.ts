import { Router } from "express";
import { ScriptController } from "../controller/ScriptController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all scripts
router.get("/", [authentication, authorization], ScriptController.listAll);

// Get all scripts with given server and alert
router.post("/", [authentication], ScriptController.getByServerAndAlert);

// Get one script
router.get("/:id", [authentication, authorization], ScriptController.getOneById);

// Delete old scripts of the given server and alert and create new ones
router.post("/new", [authentication], ScriptController.newScript);

// Delete a script
router.delete("/:id", [authentication], ScriptController.deleteScript);

export default router;