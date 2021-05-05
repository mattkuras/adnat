import React, { useContext, useState } from 'react';
import axios from 'axios'
import './login.css'
import {useHistory} from 'react-router-dom'


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false)
    const [messageSent, setMessageSent] = useState(false)
    const [message, setMessage] = useState('')
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        let user = {
            email_address: email,
            password: password,
        };
        axios.post("/login", { user })
            .then(resp => {
                if (resp.data.success) {
                    setMessageSent(true)
                    setMessage('Success!')
                    localStorage.setItem("token", resp.data.jwt)
                    props.handleLogin(resp.data.user, resp.data.user_orgs)
                    redirect()
                }
                else {
                    console.log(resp.data.errors)
                    setMessageSent(true)
                    setMessage(resp.data.errors)
                }

            })
        setPassword('')
        setEmail('')
    }


    let history = useHistory()
    const redirect = () => {
        history.push("/dashboard");
    };
   
    const resetPassword = (event) => {
        event.preventDefault()
        console.log('clicked')
        axios.post("/password/forgot", { email_address: forgotPasswordEmail })
            .then(resp => {
                if (resp.data.status == 'ok') {
                    setMessage(resp.data.message)
                    setMessageSent(true)
                }
                else {
                    setMessage(resp.data.errors)
                    console.log(resp.data.error)
                    setMessageSent(true)
                }
            })
        setForgotPasswordEmail('')
    }


    const renderOk = () => {
        return (
            <div className='message-sent'>
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div>
            <div className='login-container'>
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label for="username">Email: </label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label for="password">Password: </label>
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input  type="submit"  className='signup-button'/>
                </form>
                {forgotPassword ? <div className="forgot-password-div">
                    <label for="username">Enter you email </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter Email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                    <input className='button' type="submit" onClick={resetPassword} />
                </div> : <a onClick={e => setForgotPassword(true)}><p>forgot password?</p></a>}
                {messageSent ? renderOk() : null}

                {/* <ForgotPasswordForm/> */}
            </div>
        </div>
    );
}

export default Login;