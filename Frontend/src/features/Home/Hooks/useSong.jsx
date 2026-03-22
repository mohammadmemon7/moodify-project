import { useContext } from "react"
import { getSongs } from "../services/song.api"
import { SongContext } from "../song.context"

export const useSong=()=>{
    const context=useContext(SongContext)
    const {song,setsong,loading,setloading}=context

    async function handleGetsong({mood}) {
        setloading(true)
        const data=await getSongs({mood})
        setsong(data.song)
        setloading(false)
    }

    return ({loading,handleGetsong,song})
}