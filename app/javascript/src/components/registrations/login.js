import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    return (
        <div>
            <div className='login-container'>
            <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-contain">
          <label for="username">Email: </label>
          <input
            className="user-input"
            type="text"
            placeholder="Enter Username"
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
            </div>
        </div>
    );
}

export default Login;