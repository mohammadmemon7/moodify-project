import { createContext, useContext, useState } from "react";

export const SongContext=createContext();

export const SongProvider=({children})=>{
    const [song, setsong] = useState({
        "url": "https://ik.imagekit.io/mohammadmemon/moodfiy/songs/Ye_Bikhra_Hai_Saaman__DOWNLOAD_MING__jb9EimEQb.mp3",
        "posterurl": "https://ik.imagekit.io/mohammadmemon/moodfiy/posters/Ye_Bikhra_Hai_Saaman__DOWNLOAD_MING__dPaEV3MzL.jpeg",
        "title": "Ye Bikhra Hai Saaman [DOWNLOAD MING]",
        "mood": "happy",
    })
    const [loading, setloading] = useState(true)
    return <SongContext.Provider value={{song,setsong,loading,setloading}}>
        {children}
    </SongContext.Provider>
}