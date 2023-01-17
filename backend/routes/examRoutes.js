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
  .delete(protect, deleteExam)
  .put(protect, updateExam)
  .get(protect, getExamById);

module.exports = router