import axios from 'axios';

const API_URL = '/api/v1/users/';

/* axios api class */
export default class UsersService {

    responseHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.message);
        }
    }

    getUsers() {
        debugger
        let users = axios.get(`${API_URL}all`);
        return users;
    }

    getUserById(userId) {
        return axios.get(`${API_URL}${userId}`)
    }

    postUser(user) {
        return axios.post(`${API_URL}`, user);
    }

    putUser(user) {
        return axios.put(`${API_URL}${user.id}`, user);
    }

    deleteUser(userId) {
        return axios.delete(`${API_URL}${userId}`);
    }
}