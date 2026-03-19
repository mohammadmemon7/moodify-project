const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redis = require('../config/cache');


async function registerUser(req,res) {
    const {username,email,password}=req.body
    const isAlreadyRegister=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isAlreadyRegister){
        return res.status(400).json({
            msg:"User with the same username or email already exists "
        })
    }
    const hashed=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,email,password:hashed
    })

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    return res.status(201).json({
        msg:"User Registerd",
        user:{
            id:user._id,
            email:user.email,
            username:user.email
        }
    })

}

async function loginUser(req,res) {
    const {email,username,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            msg:"Invalid Creditials"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            msg:"Invalid Creditials"
        })
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)
    return res.status(200).json({
        msg:"User logged In!!!",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


async function getMe(req,res) {
    const user=await userModel.findById(req.user.id)
    if(!user){
        return res.status(401).json({
            msg:"User not Exists "
        })
    }
    return res.status(200).json({
        msg:"User Found",
        user
    })
}

async function logoutUser(req,res) {
    const token=req.cookies.token
    res.clearCookie("token")

    await redis.set(token,Date.now().toString())
    return res.status(201).json({
        msg:"User Logged Out"
    })
}
module.exports={registerUser,loginUser,getMe,logoutUser}