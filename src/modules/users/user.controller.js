import { Router } from "express";
import * as US from "./user.service";
import * as USV from "./user.validation";
import { validation } from "../../middlewares/validation";
const userRouter = Router();
userRouter.post("/signup", validation(USV.signUpSchema),US.signUp)
