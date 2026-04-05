import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:3000/api/songs",
    withCredentials:true
})

export async function getSongs({mood}) {
    const res=await api.get("?mood="+mood)
    return res.data
}

export async function getAllSongs() {
    const res=await api.get("/all")
    return res.data
}