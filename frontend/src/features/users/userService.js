import axios from 'axios';

const API_URL = '/api/v1/users/';
const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// Get all users
const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}all`, config(token));

  return response.data;
}

// Delete user
const deleteUser = async (user, token) => {
  const response = await axios.delete(`${API_URL}${user._id}`, config(token))

  return response.data;
}

const authService = {
  getUsers,
  deleteUser
}

export default authService;