import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUser() {

    const params = useParams(),
        [user, setUser] = useState();

    useEffect(() => {
        /* usersService.getUserById(params.id)
            .then(res => setUser(res.data))
            .catch(err => console.log(err)); */
    }, []);

  return (
    <>
        {user &&
            <div>{user.fullName}</div>
        }
    </>
  )
}
