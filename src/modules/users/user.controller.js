import { Router } from "express";
import * as US from "./user.service.js";
import * as USV from "./user.validation.js";
import { validation } from "../../middlewares/validation.js";

const userRouter = Router();

userRouter.post("/signup", validation(USV.signUpSchema), US.signUp);

export default userRouter;
