import axios from 'axios';

const API_URL = '/api/v1/exams/';
const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// Create new exam
const createExam = async (examData, token) => {
  const response = await axios.post(API_URL, examData, config(token))

  return response.data
}

// Get user exams
const getExams = async (token) => {
  const response = await axios.get(API_URL, config(token))

  return response.data
}

const getExamById = async (examId, token) => {
  const response = await axios.get(API_URL + examId, config(token));
  
  return response.data;
}

// Delete user exam
const deleteExam = async (examId, token) => {
  const response = await axios.delete(API_URL + examId, config(token));

  return response.data;
}

const updateExam = async (newExamData, token) => {
  const response = await axios.put(API_URL + newExamData._id, newExamData, config(token));

  return response.data;
}

const examService = {
  createExam,
  getExamById,
  getExams,
  deleteExam,
  updateExam,
}

export default examService;