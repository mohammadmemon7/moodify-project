const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');
const jwt = require('jsonwebtoken');

async function authUser(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            msg:"Token Not Provided"
        })
    }
    // const isBlacklist=await blacklistModel.findOne({token})
    // if(isBlacklist){
    //     return res.status(401).json({
    //         msg:"Token is already blacklisted"
    //     })
    // }
    const isBlacklist=await redis.get(token)
    if(isBlacklist){
        return res.status(401).json({
            msg:"Token is already blacklisted"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            msg:"Invalid Token"
        })
    }
}
module.exports={authUser}