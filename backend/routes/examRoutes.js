const express = require('express')
const router = express.Router()
const {
  getExams,
  getExamById,
  setExam,
  updateExam,
  deleteExam,
} = require('../controllers/examController')

const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .get(protect, getExams)
  .post(protect, setExam);
router.route('/:id')
  .get(protect, getExamById)
  .delete(protect, deleteExam)
  .put(protect, updateExam)

module.exports = router