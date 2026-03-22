import React, { useState } from 'react'
import "../styles/register.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {loading,handleRegister}=useAuth()
  const navigate=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/")
  }
  
  return (
    <main className='register-page'>
        <div className='form-container'>
            <h1>Register </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                onChange={(e)=>setusername(e.target.value)}
                value={username} placeholder='Username' id='username' name='username' required/>
                <input type="email"
                onChange={(e)=>setemail(e.target.value)}
                 placeholder='Email' value={email} id='email' name='email' required/>
                <input type="password"
                onChange={(e)=>setpassword(e.target.value)}
                 placeholder='Password' value={password} id='password' name='password' required/>
                <button type='submit' className='button'>Register</button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>

            </form>
        </div>
    </main>
  )
}

export default Register