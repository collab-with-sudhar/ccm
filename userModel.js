import mongoose from "mongoose";
let i=0
const userSchema= mongoose.Schema({
    //id:{type:Number,required:true,default:null},
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    email:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model('Users',userSchema);


export {userModel};