const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  getMe,
} = require('../controllers/userController')
const { protect, protectRole } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protectRole, getUsers)

module.exports = router
