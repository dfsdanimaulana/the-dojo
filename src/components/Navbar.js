import { Link } from 'react-router-dom'

// hooks
import { useLogout } from '../hooks/useLogout'

// styles
import './Navbar.css'

// images
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const { logout, isPending } = useLogout()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {isPending ? (
            <button className="btn" disabled>
              Logging out...
            </button>
          ) : (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}
