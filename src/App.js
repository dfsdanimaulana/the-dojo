import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// context
import { useAuthContext } from './hooks/useAuthContext'
// styles
import './App.css'

// pages
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'

// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const { user , authIsReady } = useAuthContext()
  
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {user ? <Dashboard /> : <Redirect to='/login'/> }
              </Route>
              <Route path="/create">
                {user ? <Create /> : <Redirect to='/login'/> }
              </Route>
              <Route path="/projects/:id">
                {user ? <Project /> : <Redirect to='/login'/> }
              </Route>
              <Route path="/login">
                {!user ? <Login /> : <Redirect to='/'/> }
              </Route>
              <Route path="/signup">
                {!user ? <Signup /> : <Redirect to='/'/> }
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  )
}

export default App
