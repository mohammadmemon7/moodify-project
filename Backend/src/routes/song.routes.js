const {Router} = require('express');
const upload = require('../middlewares/upload.middleware');
const { uploadSong } = require('../controllers/song.controller');
const { getSong } = require('../controllers/song.controller');


const router=Router()


router.post("/",upload.single("song"),uploadSong)

router.get("/",getSong)

module.exports=router