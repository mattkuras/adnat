import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Dashboard from './components/dashboard/dashboard'
import SignUp from "./components/registrations/signup";


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
          if (resp.data.user) {
            setUser(resp.data)
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
      <Route exact path="/"> <Landing/> </Route>
      <Route exact path='/dashboard'><Dashboard/>{loggedIn ? null : < Redirect to='/'/>}</Route>
      <Route exact path='/signup'><SignUp/></Route>
    </Router>
  );
}

export default App;
