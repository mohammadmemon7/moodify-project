import React, { useState } from 'react'
import "../styles/login.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [email, setemail] = useState("")
  const navigate = useNavigate()
  const [password, setpassword] = useState("")
  const { loading, handleLogin } = useAuth()
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await handleLogin({ email, password })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.")
    }
  }

  return (
    <main className='login-page'>
      <div className='login-card'>
        <div className='logo-container'>
          <h1 className='app-logo'>MOODIFY</h1>
          <p className='tagline'>Your mood. Your music.</p>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
          {error && <p className="error-message">{error}</p>}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className='register-prompt'>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login
