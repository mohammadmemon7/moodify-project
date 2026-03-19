const {Router} = require('express');
const {registerUser} = require('../controllers/auth.controller');
const {loginUser} = require('../controllers/auth.controller');
const {getMe} = require('../controllers/auth.controller');
const {logoutUser} = require('../controllers/auth.controller');
const authMiddleWare=require("../middlewares/auth.middleware")

const router=Router();

router.post("/register",registerUser)
router.post("/login",loginUser)

router.get("/getMe",authMiddleWare.authUser,getMe)

router.get("/logout",logoutUser)

module.exports=router