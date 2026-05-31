import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { body , validationResult } from "express-validator";
import { registerValidationRules } from "../validation/auth.validation.js";

const authRouter = Router();

authRouter.post('/register',registerValidationRules(), register);


export default authRouter;
