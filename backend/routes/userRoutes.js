const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  getMe,
} = require('../controllers/userController')
const { protect, protectRole } = require('../middleware/authMiddleware')

// auth
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

// users
router.get('/all', protectRole, getUsers)
router.delete('/:id', protectRole, deleteUser)

module.exports = router;
