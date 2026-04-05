const {Router} = require('express');
const upload = require('../middlewares/upload.middleware');
const { uploadSong, getSong, getAllSongs } = require('../controllers/song.controller');

const router=Router()

router.post("/",upload.single("song"),uploadSong)
router.get("/",getSong)
router.get("/all", getAllSongs)

module.exports=router