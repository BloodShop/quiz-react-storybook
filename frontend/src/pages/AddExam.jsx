import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExams, reset } from '../features/exams/examSlice';
import Spinner from '../components/Spinner';
import ExamForm from '../components/ExamForm';

export default function AddExam() {

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        { user } = useSelector((state) => state.auth),
        { isLoading, isError, message } = useSelector((state) => state.exams);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        if (user.role !== 'teacher' && user.role !== 'manager') {
            navigate(-1)
        }

        dispatch(getExams())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='App col card p-40'>
            <section className='heading'>
                <h1>Welcome {user && user.fullName}</h1>
            </section>
            <header>
                <h1 className='card-header'>Exam Form</h1>
            </header>
            <ExamForm />
        </div>
    );
}
