import React, { useEffect, useState } from 'react'
import QuestionList from './questionList/questionList'
import { style } from './examPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ExamPage() {

    const params = useParams(),
        baseUrl = 'http://localhost:3001',
        headers = { 'Content-Type': 'application/json' },
        [exam, setExam] = useState();

    useEffect(() => {
            axios
                .get(`${baseUrl}/exams/${params.id}`/* , { headers } */)
                .then(response => setExam(response.data))
                .catch(err => console.log(err));
        }, []);

    /* const exam = exams.find(exam => exam.id === params.id); */
    /* const [questions, setQuestions] = useState(exam.questions); */
    return (
        <>
            {exam && <div className='App'>
                <header>
                    <h1>{exam.title}</h1>
                </header>
                <QuestionList questionsP={exam.questions} />
            </div>}
        </>
    );
}
