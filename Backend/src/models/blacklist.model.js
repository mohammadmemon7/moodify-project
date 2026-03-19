const mongoose = require('mongoose');

const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is Required for blacklisting"],
        
    }
},{
    timestamps:true
})

const blacklistModel=mongoose.model("BlacklistToken",blacklistSchema)
module.exports=blacklistModel