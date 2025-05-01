import expressAsyncHandler from "express-async-handler";
import {userModel} from "../../DB/models/index.js";
import { Compare, Encrypt, eventEmitter, Hash } from "../../utils/index.js";
import { roles } from "../../middlewares/auth.js";

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

export const login = expressAsyncHandler(async (req, res, next) => {
    const {email , password} = req.body
    const user = await userModel.findOne({email , confirm: true})
    if(!user){
        return next(new Error("email not exist or not confirmed", { cause: 400 }))
    }
    const match = await Compare({key: password , hashed: user.password})
    if(!match){
        return next(new Error("invalid password", { cause: 400 }))
    }
    const token = await user.generateToken(
        { payload :{email ,id :user._id} ,
        SIGNATURE: user.role === roles.user ? process.env.TOKEN_SIGNATURE_USER : process.env.TOKEN_SIGNATURE_ADMIN,
        options: { expiresIn: "1h" } }
    )
    return res.status(200).json({message: "login successfully", token})
    })
   
 

export const refreshToken = expressAsyncHandler(async (req, res, next) => {
    const {authorization} = req.body
    const [prefix, token] = authorization?.split(' ') || []
    if (!prefix || !token) {
        return next(new Error("authorization token is required!!!!", { cause: 400 }))
    }
    let SIGNATURE = undefined
    if (prefix === process.env.PREFIX_SIGNATURE_USER) {
        SIGNATURE = process.env.TOKEN_SIGNATURE_USER
    } else if (prefix === process.env.PREFIX_SIGNATURE_ADMIN) {
        SIGNATURE = process.env.TOKEN_SIGNATURE_ADMIN
    } else {
        return next(new Error("Invalid authorization token prefix", { cause: 401 }))
    }
    const decoded = jwt.verify(token, SIGNATURE)
    if (!decoded?.id) {
        return next(new Error("Invalid token payload", { cause: 400 }))
    }
    const user = await userModel.findById(decoded.id)
    const accessToken = await user.generateToken(
        { payload :{email :user.email ,id :user._id} ,
        SIGNATURE: user.role === roles.user ? process.env.TOKEN_SIGNATURE_USER : process.env.TOKEN_SIGNATURE_ADMIN,
        options: { expiresIn: "1h" } }
    )
    return res.status(200).json({message: "refresh token successfully", token: accessToken})

     
  

 
    })
   
 