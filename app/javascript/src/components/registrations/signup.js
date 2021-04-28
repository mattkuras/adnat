import React, { useState } from 'react';
import Axios from 'axios'
import {AiOutlineClose} from 'react-icons/ai'
import "./SignUp.css"

const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [messageSent, setMessageSent] = useState(false)
    const [message, setMessage] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            email_address: email, password, name
        }
        Axios.post('/users', { user })
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log(response)
                    // setMessageSent(true)
                    // setMessage(response.data.success)
                }
                else {
                    console.log(response)
                    // setMessageSent(true)
                    // setMessage(response.data)
                }
            })
        setEmail('')
        setName('')
        setPassword('')
    };
    const renderOk = () => {
        return (
            <div className='message-sent'>
                <p>{message}</p>
            </div>
        )
    }

    return (
        // <div className='signup-container'>
        <form className="signup-form" onSubmit={handleSubmit}>
            <span className='close'><AiOutlineClose onClick={() => props.toggle(false)}/></span>
            <h2>Signup</h2>
            <div className="input-container">
                <input className="input" type="text" placeholder="Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type='text' placeholder="name" id="name" value={reference} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='sub-btn'>
                <input type="submit" value='Send Request' className='signup-button' />
                {messageSent ? renderOk() : null}
            </div>
        </form>
        // </div>
    );
}

export default SignUp;