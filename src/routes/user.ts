import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const router = Router();

// Get all users
router.get("/", [authentication, authorization], UserController.listAll);

// Get one user
router.get("/:id", [authentication, authorization], UserController.getOneById);

// Create a new user
router.post("/new", [authentication, authorization], UserController.newUser);

// Edit a user
router.patch("/:id", [authentication, authorization], UserController.editUser);

// Delete a user
router.delete("/:id", [authentication, authorization], UserController.deleteUser);

export default router;