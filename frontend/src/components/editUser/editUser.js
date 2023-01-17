import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UsersService from '../../services/users.service';

export default function EditUser() {

    const params = useParams(),
        [user, setUser] = useState(),
        usersService = new UsersService();

    useEffect(() => {
        usersService.getUserById(params.id)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, []);

  return (
    <>
        {user &&
            <div>{user.fullName}</div>
        }
    </>
  )
}
