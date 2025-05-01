import { Router } from "express";
import * as US from "./user.service.js";
import * as USV from "./user.validation.js";
import { validation } from "../../middlewares/validation.js";

const userRouter = Router();

userRouter.post("/signup", validation(USV.signUpSchema), US.signUp);
userRouter.patch("/confirm-email",validation(USV.confirmEmailSchema) , US.confirmEmail);
userRouter.post("/login", validation(USV.loginSchema), US.login);
userRouter.get("/refreshToken",validation(USV.refreshTokenSchema) ,  US.refreshToken);
export default userRouter;
