import React, { useEffect, useState } from 'react'
import QuestionList from '../components/examPage/questionList/questionList'
import { useParams } from 'react-router-dom';
import { getExamById } from '../features/exams/examSlice';
import { useDispatch } from 'react-redux';

export default function Exam() {

    const params = useParams(),
        dispatch = useDispatch(),
        [exam, setExam] = useState(null);

    useEffect(() => {
        dispatch(getExamById(params.id))
            .then(data => setExam(data.payload));
    }, []);

    return (
        <>
            {exam && <div className='App'>
                <header>
                    <h1>{exam.title}</h1>
                </header>
                <QuestionList examP={exam} />
            </div>}
        </>
    );
}
