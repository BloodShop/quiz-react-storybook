import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Danger, Primary, Secondary, Success } from '../examPage/button/button.stories';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../services/users.service';

export default function Users() {

    const [users, setUsers] = useState([]),
        apiUrl = process.env.REACT_APP_SERVER_URL,
        examsRoute = process.env.REACT_APP_USERS_ROUTE,
        defaultHeaders = { 'Content-Type': 'application/json' },
        baseUrl = apiUrl + examsRoute,
        navigate = useNavigate(),
        usersService = new UsersService();

    useEffect(() => {
        usersService.getUsers()
            .then(res => setUsers(res.data));
    }, []);

    const deleteUser = (userId) => {
        usersService.deleteUser(userId)
            .then(res => {
                let updatedUsers = [...users];
                setUsers(updatedUsers.filter(user => user.id !== userId));
            });
    }

    const addUser = () => {
        let newUser = {
            fullName: 'Amir Maimon',
            email: 'amiri7677@gmail.com'
        }

        usersService.postUser({ ...newUser, id: 0 })
            .then(res => setUsers([...users, res.data]));
    }

    const editUser = (user, data) => {
        let newUser = {...user, fullName: 'hahasd' };
        usersService(newUser)
            .then(data => {
                axios.get(baseUrl)
                    .then(res => setUsers(res.data))
                    .catch(err => console.log(err));
            });
    }

    return (
        <div className='App'>
            <div className='row row-cols-md-3 g-4'>
                {users.map(user => <div className='col card p-40' key={user.id}>
                    <h1>{user.fullName}</h1>
                    <div>{user.id}</div>
                    <div>{user.email}</div>
                    <Secondary onClick={() => navigate(`${user.id}`)}>Edit user</Secondary>
                    <Primary onClick={() => editUser(user)}>Edit name</Primary>
                    <Danger onClick={() => deleteUser(user.id)}>Delete user</Danger>
                </div>)}
            </div>
            <Success onClick={addUser}>Add User</Success>
        </div>
    );
}
