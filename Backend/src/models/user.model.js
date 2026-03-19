const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"],
        unique:[true,"Username should be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email should be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        select:false
    }
})

const userModel=mongoose.model("users",userSchema)
module.exports=userModel