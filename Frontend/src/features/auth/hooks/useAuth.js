import { useContext } from "react";
import { getMe, login, logout, register } from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,setuser,loading,setloading}=context

    async function handleRegister({username,email,password}) {
        setloading(true)
        try {
            const data=await register({username,email,password})
            setuser(data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    async function handleLogin({username,email,password}) {
        setloading(true)
        const data=await login({username,email,password})
        setuser(data.user)
        setloading(false)
    }
    async function handleGetme() {
        setloading(true)
        try{
            const data=await getMe()
            setuser(data.user)
        }catch(err){
            setuser(null)
        }
        setloading(false)
    }
    async function handleLogout() {
        setloading(true)
        const data=await logout()
        setuser(null)
        setloading(false)
    }

    useEffect(()=>{
        handleGetme()
    },[])
    return ({user,loading,handleGetme,handleLogin,handleRegister,handleLogout})
}