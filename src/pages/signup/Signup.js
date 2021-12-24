import { useState } from 'react'

// hooks
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [thumb, setThumb] = useState(null)
  const [thumbError, setThumbError] = useState(null)
  const { isPending, error, signup } = useSignup()

  // handle image input
  const handleFileChange = (e) => {
    setThumbError(null)
    let selected = e.target.files[0]

    // cek if file exists
    if (!selected) {
      setThumbError('Please select an image')
      return
    }

    // cek if selected file is an image
    if (!selected.type.includes('image')) {
      setThumbError('File must be an image')
      return
    }

    // cek image size
    if (!selected.size > 100000) {
      setThumbError('Image size must be less than 100kb')
      return
    }

    setThumbError(null)
    setThumb(selected)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumb)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <label>
        <span>User Name :</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
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
      <label>
        <span>Profile Thumbnail :</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbError && <div className="error">{thumbError}</div>}
      </label>

      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
