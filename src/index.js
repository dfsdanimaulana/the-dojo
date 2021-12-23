import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// styles
import './index.css'

// context
import { AuthContextProvider } from '../src/context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
