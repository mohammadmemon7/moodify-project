import { useContext } from "react"
import { getSongs, getAllSongs } from "../services/song.api"
import { SongContext } from "../song.context"

export const useSong = () => {
    const context = useContext(SongContext)
    const { 
        song, setsong, 
        loading, setloading, 
        playlist, setplaylist, 
        allSongs, setallSongs 
    } = context

    async function handleGetsong({ mood }) {
        setloading(true)
        const data = await getSongs({ mood })
        setsong(data.song)
        window.dispatchEvent(new Event('autoplay-song'))
        setplaylist(data.songs)
        setloading(false)
    }

    async function handleGetAllSongs() {
        const data = await getAllSongs()
        setallSongs(data.songs)
    }

    return ({ 
        loading, 
        setloading,
        handleGetsong, 
        song, 
        setsong,
        playlist, 
        setplaylist,
        allSongs, 
        setallSongs,
        handleGetAllSongs 
    })
}
