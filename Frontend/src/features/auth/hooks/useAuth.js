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
            console.error("Registration failed:", error.response?.data?.msg || error.message)
            throw error
        } finally {
            setloading(false)
        }
    }
    async function handleLogin({username,email,password}) {
        setloading(true)
        try {
            const data=await login({username,email,password})
            setuser(data.user)
        } catch (error) {
            console.error("Login failed:", error.response?.data?.msg || error.message)
            throw error // Re-throw so caller can handle if needed
        } finally {
            setloading(false)
        }
    }
    async function handleGetme() {
        setloading(true)
        try{
            const data=await getMe()
            setuser(data.user)
        }catch(err){
            // Normal behavior when not logged in, no need to log error
            setuser(null)
        } finally {
            setloading(false)
        }
    }
    async function handleLogout() {
        setloading(true)
        try {
            await logout()
            setuser(null)
        } catch (error) {
            console.error("Logout failed:", error.message)
        } finally {
            setloading(false)
        }
    }

    useEffect(()=>{
        handleGetme()
    },[])
    return ({user,loading,handleGetme,handleLogin,handleRegister,handleLogout})
}