import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, useHistory, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Login from './components/registrations/login'
import Landing from './components/landing/landing'
import Signup from './components/registrations/signup'
import Dashboard from './components/landing/dashboard'

function App() {
  const [user, setUser] = useState()

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getLogin()
  }, [])

  const getLogin = () => {
    const token = localStorage.getItem("token")
    if (token) {
      Axios.get('/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          if (resp.data.user) {
          console.log('use effect just got user')

            setUser(resp.data.user)
            setLoggedIn(true)
          }
          else {
            setMember(resp.data)
            setLoggedIn(false)
          }
        })
    }
  }

  const handleLogin = (user) => {
    if (user.name) {
      setUser(user)
    setLoggedIn(true)}
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
        {/* {loggedIn && user != null ? null : <Redirect to="/login" />} */}
      </Route>
    </Router>
  );
}

export default App;
