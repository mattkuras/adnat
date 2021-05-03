import React, { useState, useEffect } from "react"
import { UserContext } from './userContext.js'
import './App.css';
import { Redirect, Route, useHistory, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Login from './components/registrations/login'
import Landing from './components/landing/landing'
import Signup from './components/registrations/signup'
import Dashboard from './components/landing/dash/dashboard'

function App() {
  const [user, setUser] = useState({})
  const [userOrgs, setUserOrgs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    autoLogin()
  }, [])

  const autoLogin = () => {
    const token = localStorage.getItem("token")
    if (token) {
      Axios.get('/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          if (resp.data.success) {
            console.log('about to set logged in in app.js')
            handleLogin(resp.data.user, resp.data.user_orgs)
          }
          else {
            setUser({})
            setLoggedIn(false)
          }
        })
    }
  }

  const handleLogin = (user, orgs) => {
    setUser(user)
    setUserOrgs(orgs)
    setLoggedIn(true)
  }
  const handleLogout = () => {
    localStorage.clear()
    setUser({})
    setLoggedIn(false)
  }




  return (
    <Router>
      <UserContext.Provider value={{ user, userOrgs, setUserOrgs }} >
        <Route exact path='/'><Landing /></Route>
        <Route path='/login'><Login handleLogin={handleLogin} /></Route>
        <Route path='/signup'><Signup handleLogin={handleLogin} /></Route>
        <Route path='/dashboard'>
          <Dashboard handleLogout={handleLogout} />
          {loggedIn ? null : <Redirect to="/login" />}
        </Route>
      </UserContext.Provider >
    </Router>
  );
}

export default App;
