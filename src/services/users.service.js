import axios from 'axios';

const apiUrl = process.env.REACT_APP_SERVER_URL,
    examsRoute = process.env.REACT_APP_USERS_ROUTE,
    defaultHeaders = { 'Content-Type': 'application/json' },
    baseUrl = apiUrl + examsRoute;

export default class UsersService {

    responseHandler(res) {

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.message);
        }
    }

    getUsers() {
        return axios.get(`${baseUrl}`);
    }

    getUserById(userId) {
        return axios.get(`${baseUrl}${userId}`)
    }

    postUser(user) {
        return axios.post(`${baseUrl}`, user);
    }

    putUser(user) {
        return axios.put(`${baseUrl}${user.id}`, user);
    }

    deleteUser(userId) {
        return axios.delete(`${baseUrl}${userId}`);
    }
}