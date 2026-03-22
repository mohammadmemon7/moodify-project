const songModel = require('../models/song.model');
const id3 = require('node-id3');
const storageService = require('../services/storage.service');

async function uploadSong(req,res) {
    const songBuffer=req.file.buffer
    const {mood}=req.body
    const tags=id3.read(songBuffer)
    // console.log(tags);
    
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "moodfiy/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "moodfiy/posters"
        })
    ]);

    const song=await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterurl:posterFile.url,
        mood
    })
    return res.status(201).json({
        msg:"Song created",
        song
    })
}

async function getSong(req,res) {
    const {mood}=req.query
    const song=await songModel.findOne({mood})

    return res.status(200).json({
        msg:"Song Fetched", 
        song
    })
}

module.exports={uploadSong,getSong}