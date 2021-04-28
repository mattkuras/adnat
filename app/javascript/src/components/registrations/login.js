import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false)
    const [messageSent, setMessageSent] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        let user = {
            email_address: email,
            password: password,
        };
        axios.post("/login", { user })
            .then(resp => {
                if (resp.data.success) {
                    localStorage.setItem("token", resp.data.jwt)
                    props.handleLogin(resp.data.user)
                    redirect()
                }
                else {
                    console.log(resp.data.failure)
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
        axios.post("/password/forgot", { email_address: email2 })
        .then(resp => {
            if(resp.data.status == 'ok'){
                setMessage(resp.data.message)
            }
        })
        
    }

    const ForgotPasswordForm = () => (
            <div className="input-contain">
                <label for="username">Enter you email </label>
                <input
                    className="user-input"
                    type="text"
                    placeholder="Enter Email"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
                />
            <input className='button' type="submit" onClick={resetPassword}/>
            </div>
    )

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
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-contain">
                        <label for="username">Email: </label>
                        <input
                            className="user-input"
                            type="text"
                            placeholder="Enter Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-contain">
                        <label for="password">Password: </label>
                        <input
                            className="user-input"
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input className='button' type="submit" />
                </form>
                {forgotPassword ? <ForgotPasswordForm/> : <a onClick={e => setForgotPassword(true)}><p>forgot password?</p></a>}
                {/* <ForgotPasswordForm/> */}
            </div>
            {messageSent ? renderOk() : null}
        </div>
    );
}

export default Login;