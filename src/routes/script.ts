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

// Create a new script
router.post("/new", [authentication], ScriptController.newScript);

router.post("/many", [authentication], ScriptController.newManyScript);
// Delete a script
router.delete("/:id", [authentication], ScriptController.deleteScript);

export default router;
