import expressAsyncHandler from "express-async-handler";
import {userModel} from "../../DB/models/index.js";
import { Compare, Encrypt, eventEmitter, Hash } from "../../utils/index.js";

export const signUp = async (req, res, next) => {
    try{

    
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
    eventEmitter.emit("sendEmailConfirmation", {email})
    const user = await userModel.create({name , email , password: hash , phone: chiperText})
    return res.status(201).json({message: "user created successfully", user})

}catch(err){
    return next(err)
}

}

export const confirmEmail = expressAsyncHandler(async (req, res, next) => {
   const {email , otp} = req.body
    const user = await userModel.findOne({email , otp})     
   if(!user){
    return next(new Error("email not exist or already confirmed", { cause: 400 }))
   }
   const match = await Compare({key: otp , hashed: user.otp})
    if(!match){
     return next(new Error("invalid otp", { cause: 400 }))
    }
    await userModel.updateOne({email} , {confirm: true , $unset: {otp: 0}})
    return res.status(200).json({message: "email confirmed successfully"})

})
