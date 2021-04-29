import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import './signup.css'
import Axios from 'axios'

const Signup = (props) => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [passwordConfirmation, setPasswordConfirmation] = useState('')
   const [messageSent, setMessageSent] = useState(false)
   const [message, setMessage] = useState('')

   const handleSubmit = (event) => {
      event.preventDefault()
      let user = {
          email_address: email,
          password,
          password_confirmation: passwordConfirmation,
          name,
      }
      Axios.post('/signup', { user })
          .then(response => {
              if (response.data.user) {
                  setMessage('success!')
                  setMessageSent(true)
                  props.handleLogin(response.data.user)
                  redirect()
              }
              else {
                  setMessageSent(true)
                  setMessage(response.data.message)
              }
          })
      setEmail('')
      setName('')
      setPasswordConfirmation('')
      setPassword('')
  };

  let history = useHistory()
  const redirect = () => {
      history.push("/dashboard");
  };

  const renderOk = () => {
   return (
       <div className='message-sent'>
           <p>{message}</p>
       </div>
   )
}

    return ( 
        <div>
           <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Welcome to Adnat! Sign up here</h2>
           
            <div className="input-container">
                <input className="input" type="text" placeholder="Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input split" type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="input split" type="password" placeholder="Password Confirmation" id="password-confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>
            <div className='sub-btn'>
                <input type="submit" value='Send Request' className='signup-button' />
                {messageSent ? renderOk() : null}
            </div>
        </form>
        </div>
     );
}
 
export default Signup;
