import React, { useEffect, useState } from "react";
import { DangerBtn } from "../components/button/button.stories";
import { Large } from "../components/input/input.stories";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, reset } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteIcon } from "../components/Icon/icon.stories";

export default function Users() {
    const { users, isLoading, isError, message } = useSelector(
            (state) => state.users
        ),
        { user } = useSelector((state) => state.auth),
        [query, setQuery] = useState(""),
        dispatch = useDispatch(),
        navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getUsers());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    const deleteUserHandler = (usr) => {
        dispatch(deleteUser(usr));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="App">
            <div className="inline">
                <Large
                    type="search"
                    placeholder="Search User"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <div className="row row-cols-md-3 g-4">
                {users.length > 0
                    ? users
                          .filter((u) =>
                              query === ""
                                  ? u
                                  : u.fullName
                                        .toLowerCase()
                                        .includes(query.toLowerCase())
                                  ? u
                                  : ""
                          )
                          .map((u) => (
                              <div className="col card p-40" key={u._id}>
                                  <h1>{u.fullName}</h1>
                                  <div>Id: {u._id}</div>
                                  <div>Email: {u.email}</div>
                                  {user.role === "manager" &&
                                  u._id !== user._id ? (
                                      <DeleteIcon
                                          onClick={() => deleteUserHandler(u)}
                                      >
                                          ❌
                                      </DeleteIcon>
                                  ) : (
                                      ""
                                  )}
                              </div>
                          ))
                    : ""}
            </div>
        </div>
    );
}
