import React, { useState } from 'react'
import { Primary } from '../examPage/button/button.stories';
import { Medium } from '../examPage/input/input.stories';
import { useAuth } from './auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useState(''),
        auth = useAuth(),
        navigate = useNavigate(),
        location = useLocation(),
        redirectPath = location.state?.path || '/';

    const handleLogin = () => {
        auth.login(user)
        navigate(redirectPath, { replace: true });
    }

    return (
        <div>
            <label>Username: { ' ' }
                <Medium type='text' onChange={e => setUser(e.target.value)} />
            </label>
            <Primary onClick={handleLogin} >Login</Primary>
        </div>
    );
}
