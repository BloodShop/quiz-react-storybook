import axios from 'axios';

const apiUrl = process.env.REACT_APP_SERVER_URL,
    examsRoute = process.env.REACT_APP_EXAMS_ROUTE,
    defaultHeaders = { 'Content-Type': 'application/json' },
    baseUrl = apiUrl + examsRoute;

/* fetch api class */
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
        return fetch(`${baseUrl}${id}`, { headers: defaultHeaders })
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

        return fetch(`${baseUrl}${exam.id}`, requestOptions)
            .then(this.responseHandler);
    }

    deleteExam(examId) {
        return fetch(`${baseUrl}${examId}`, { method: 'DELETE', headers: defaultHeaders })
            .then(this.responseHandler);
    }
}