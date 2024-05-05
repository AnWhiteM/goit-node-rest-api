import express from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import {userSignupSchema, userSigninSchema, userEmailSchema} from "../schemas/userSchemas.js";

import authenticate from "../middlewares/authMiddlewares.js";

import upload from "../middlewares/upload.js"

const authRouter = express.Router();

authRouter.post("/register", upload.single("avatar"), validateBody(userSignupSchema), authController.signup);

authRouter.post("/login", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", validateBody(userEmailSchema), authController.resendVerifyEmail);
   
authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch("/subscription", authenticate, authController.updateStatus);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

export default authRouter;