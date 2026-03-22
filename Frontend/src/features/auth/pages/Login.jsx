import React, { useState } from 'react'
import "../styles/login.scss"
import Formgroup from '../components/Formgroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [email, setemail] = useState("")
  const navigate=useNavigate()
  const [password, setpassword] = useState("")
  const {loading,handleLogin}=useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/")
  }
  return (
    <main className='login-page'>
        <div className='form-container'>
            <h1>Login </h1>
            <form onSubmit={handleSubmit}>
                <Formgroup value={email} onChange={(e)=>setemail(e.target.value)} label='Email' placeholder='Email' />
                <Formgroup label='Password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Password' />
                <button type='submit' className='button'>Login</button>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    </main>
  )
}

export default Login