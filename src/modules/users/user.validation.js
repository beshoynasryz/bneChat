import Joi from "joi"
export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    age: Joi.number().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid("male", "female").required(),
    role: Joi.string().valid("user", "admin").required(),
})

