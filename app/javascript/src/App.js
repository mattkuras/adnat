import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, useHistory, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Login from './components/registrations/login'
import Landing from './components/landing/landing'
import Signup from './components/registrations/signup'
import Dashboard from './components/landing/dashboard'

function App() {
  const [user, setUser] = useState(null)

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      Axios.get('/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          console.log('1', resp.data)
          console.log('2', resp.data.user)
          if (resp.data.user) {
            setUser(resp.data.user)
            setLoggedIn(true)
          }
        })
    }
  }, [])

  const handleLogin = (user) => {
    if (user) {
      setUser(user)
      setLoggedIn(true)
    }
  }
  const handleLogout = () => {
    localStorage.clear()
    setUser({})
    setLoggedIn(false)
  }

 


  return (
    <Router>
      <Route exact path='/'><Landing /></Route>
      <Route path='/login'><Login handleLogin={handleLogin} /></Route>
      <Route path='/signup'><Signup handleLogin={handleLogin} /></Route>
      <Route path='/dashboard'>
        <Dashboard user={user} handleLogout={handleLogout} />
        {loggedIn && user  ? null : <Redirect to="/login" />}
      </Route>
    </Router>
  );
}

export default App;
