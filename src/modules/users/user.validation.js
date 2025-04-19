import Joi from "joi"
import  generalRules  from "../../utils/generalRules/index.js"
export const signUpSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    cPassword: generalRules.password.required().valid(Joi.ref('password')),
    phone: Joi.string().required(),
})

export const confirmEmailSchema = Joi.object({
    email: generalRules.email.required(),
    code: Joi.string().length(4).required(),
})

