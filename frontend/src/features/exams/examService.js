import axios from 'axios'

const API_URL = '/api/v1/exams'

// Create new exam
const createExam = async (examData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, examData, config)

  return response.data
}

// Get user exams
const getExams = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user exam
const deleteExam = async (examId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + examId, config)

  return response.data
}

const examService = {
  createExam,
  getExams,
  deleteExam,
}

export default examService