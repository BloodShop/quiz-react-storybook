import React, { useEffect, useState } from 'react'
import QuestionList from '../components/examPage/questionList/questionList'
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById, reset } from '../features/exams/examSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

export default function Exam() {

    const params = useParams(),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        { user } = useSelector((state) => state.auth),
        { exam, isLoading, isError, message } = useSelector((state) => state.exams);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }
        
        dispatch(getExamById(params.id));

        return () => {
            dispatch(reset());
        }
    }, [ isError, message, navigate, dispatch]);

    if(isLoading) {
        return <Spinner />
    }

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
