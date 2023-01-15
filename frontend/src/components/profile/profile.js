import React from 'react'
import { useAuth } from '../auth/auth'
import { Danger } from '../examPage/button/button.stories';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const auth = useAuth(),
        navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    }

    return (
        <div>
            <h1>Welcome {auth.user}</h1>
            <Danger onClick={handleLogout}>Logout</Danger>
        </div>
    );
}
