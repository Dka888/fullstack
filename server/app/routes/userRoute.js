
import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userController.js";
import {check} from 'express-validator';

router.post("/register", [
    check('username', 'username cannot be empty').notEmpty(),
    check('password', 'password should be a least 5 chars').isLength({min: 5 }),
], userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
router.patch("/username/:id", userController.updateUser);
router.patch("/email/:id", userController.updateMail);
router.delete("delete/:id", userController.deleteUser);

export default router;


