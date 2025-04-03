import {userModel} from "../../DB/models/index.js";
import { Encrypt, Hash } from "../../utils/index.js";
import { asyncHandler } from "../../utils/globalErrorHandling";

export const signUp = asyncHandler(async (req, res, next) => {
    const {name , email, password ,phone} = req.body
    //check email 

    if(await userModel.findOne({email})){
        return next(new Error("email already exist", { cause: 409 }))
    }

    //encrypt phone 
    const chiperText = await Encrypt({key: phone , SECRET_KEY: process.env.SECRET_KEY}) 
    //hash password
    const hash = await Hash({key: password , SALT_ROUNDS: process.env.SALT_ROUNDS})
    //send otp message 
    const user = await userModel.create({name , email , password: hash , phone: chiperText})
    return res.status(201).json({message: "user created successfully", user})



})

