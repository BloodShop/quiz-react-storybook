import React, { useEffect, useState } from 'react'
import QuestionList from './questionList/questionList'
import { style } from './examPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExamService from '../../services/exams.service';

export default function ExamPage() {

    const service = new ExamService(),
        params = useParams(),
        [exam, setExam] = useState();

    useEffect(() => {
        service.getExamById(params.id)
            .then(res => setExam(res))
            .catch(err => console.log(err))
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
