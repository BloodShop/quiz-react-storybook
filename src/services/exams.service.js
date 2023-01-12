import axios from 'axios';

const baseUrl = 'http://localhost:3001/exams',
    defaultHeaders = { 'Content-Type': 'application/json' };

export default class ExamService {

    responseHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.message);
        }
    }

    getExams() {
        return fetch(baseUrl, { headers: defaultHeaders })
            .then(this.responseHandler);
    }

    getExamById(id) {
        return fetch(`${baseUrl}/${id}`, { headers: defaultHeaders })
            .then(this.responseHandler);
    }

    postExam(exam) {

        const requestOptions = {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(exam)
        };

        return fetch(`${baseUrl}`, requestOptions)
            .then(this.responseHandler);
    }

    putExam(exam) {

        const requestOptions = {
            method: 'PUT',
            headers: defaultHeaders,
            body: JSON.stringify(exam)
        };

        return fetch(`${baseUrl}/${exam.id}`, requestOptions)
            .then(this.responseHandler);
    }

    deleteExam(examId) {
        return fetch(`${baseUrl}/${examId}`, { method: 'DELETE', headers: defaultHeaders })
            .then(this.responseHandler);
    }
}