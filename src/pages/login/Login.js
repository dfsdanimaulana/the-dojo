import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { user } = useAuthContext()

  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])
  
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log In</h2>

      <label>
        <span>Email :</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password :</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      {!isPending && <button className="btn">Log in</button>}
      {isPending && (
        <button className="btn" disabled>
          loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
