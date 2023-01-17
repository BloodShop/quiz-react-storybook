import React, { useState } from 'react'
import { PrimaryBtn } from '../button/button.stories';
import { Medium } from '../input/input.stories';
import { useAuth } from './auth';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({ setToken }) {

    const [username, setUserName] = useState(''),
        [password, setPassword] = useState(),
        auth = useAuth(),
        navigate = useNavigate(),
        location = useLocation(),
        redirectPath = location.state?.path || '/';

    const handleLogin = () => {
        auth.login(username)
        navigate(-1, { replace: true });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <Medium type='text' onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    Password
                    <Medium type='password' onChange={e => setPassword(e.target.value)}/>
                </label>
                <PrimaryBtn onClick={handleLogin} >Login</PrimaryBtn>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
