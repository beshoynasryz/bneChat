import mongoose from "mongoose";
const genderType = {
    male : "male",
    female : "female"
}
const roleType = {
    user : "user",
    admin : "admin"
}
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"],
        trim : true,
    
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
    },
    age: {
        type: Number,
       
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
 
    },
    gender: {

        type: String,
        enum: Object.values(genderType),
        default : genderType.male,
        
    },
    confirm : {
        type : Boolean,
        default : false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

    role : {
        type: String,
        enum: Object.values(roleType),
        default: "user",
    },
    image : {
        type : String,
        
    },
    coverImage : {
        type : [String],
        
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now,
    },
    otp: {
        type: String,
        
    },
   

}, {
    timestamps: true}); 

export const userModel =mongoose.models.User ||  mongoose.model("User", UserSchema);
