import { NavLink } from 'react-router-dom'

// context
import { useAuthContext } from '../hooks/useAuthContext'

// pages
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'

// styles
import './Sidebar.css'

export default function Sidebar() {
  const { user } = useAuthContext()
  
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* user  Avatar*/}
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="dashboard icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
