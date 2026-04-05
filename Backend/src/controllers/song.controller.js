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
    const songs=await songModel.find({mood})
    if(!songs || songs.length===0){
        return res.status(404).json({msg:"No songs found for this mood"})
    }
    const randomIndex=Math.floor(Math.random()*songs.length)
    const song=songs[randomIndex]
    return res.status(200).json({
        msg:"Songs Fetched",
        songs,
        song
    })
}

async function getAllSongs(req,res){
    const songs=await songModel.find({})
    return res.status(200).json({
        msg:"All songs fetched",
        songs
    })
}

module.exports={uploadSong,getSong,getAllSongs}