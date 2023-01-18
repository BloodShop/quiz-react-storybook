import axios from 'axios';

const API_URL = '/api/v1/users/';
const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
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
  register,
  logout,
  login,
  getUsers,
  deleteUser
}

export default authService;