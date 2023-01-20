const asyncHandler = require('express-async-handler')

const Exam = require('../models/examModel');
const User = require('../models/userModel');

// @desc    Get exams
// @route   GET /api/exams
// @access  Private
const getExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find({ user: req.user.id });
  res.status(200).json(exams);
})

// @desc    Get exam by id
// @route   GET /api/exams/:id
// @access  Public
const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findOne({ user: req.user.id, _id: req.params.id });

  res.status(200).json(exam);
})

// @desc    Set exam
// @route   POST /api/exams
// @access  Private
const setExam = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400)
    throw new Error('Please add a title / description')
  }

  const exam = await Exam.create({
    title: req.body.title,
    description: req.body.description,
    releasedDate: req.body.releasedDate,
    questions: req.body.questions,
    user: req.user.id
  })

  res.status(200).json(exam)
})

// with my exam mongoose schema can you generate post method with mongoose

// @desc    Update exam
// @route   PUT /api/exams/:id
// @access  Private
const updateExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error('Exam not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the exam user
  if (exam.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedExam)
})

// @desc    Delete exam
// @route   DELETE /api/exams/:id
// @access  Private
const deleteExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error('Exam not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the exam user
  if (exam.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await exam.remove();

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getExams,
  getExamById,
  setExam,
  updateExam,
  deleteExam,
}
