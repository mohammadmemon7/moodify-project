import React, { useState } from 'react'
import "../styles/register.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const { loading, handleRegister } = useAuth()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await handleRegister({ username, email, password })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.")
    }
  }

  return (
    <main className='register-page'>
      <div className='register-card'>
        <div className='logo-container'>
          <h1 className='app-logo'>MOODIFY</h1>
          <p className='tagline'>Your mood. Your music.</p>
        </div>

        <form onSubmit={handleSubmit} className='register-form'>
          {error && <p className="error-message">{error}</p>}
          <div className='form-field'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder='Enter your username'
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder='••••••••'
              required
            />
          </div>

          <button type='submit' className='submit-button' disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className='login-prompt'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register
