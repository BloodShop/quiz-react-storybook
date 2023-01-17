import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ExamService from '../services/exams.service'
import { Success } from '../components/examPage/button/button.stories';
import { Large, Medium, Small } from '../components/examPage/input/input.stories';
import { useDispatch, useSelector } from 'react-redux';
import { getExams, reset } from '../features/exams/examSlice';
import Spinner from '../components/Spinner';

export default function AddExam() {

    const titleRef = useRef(),
        descriptionRef = useRef();

        const service = new ExamService(),
        navigate = useNavigate(),
        [exam, setExam] = useState([]);

        const dispatch = useDispatch(),
            { user } = useSelector((state) => state.auth),
            { isLoading, isError, message } = useSelector((state) => state.exams);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }
        debugger
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

    const handleSubmit = (e) => {
        e.preventDefault();

        service.postExam({ ...exam, id: 0, releasedDate: Date.now(), questions: [] })
            .then(data => navigate(`/exams/${data.id}`));
    }

    const updateField = (e) => {
        const newExam = {...structuredClone(exam)};
        newExam[e.target.name] = e.target.value;
        console.log(e.target.name, newExam[e.target.name]);


        setExam(newExam);
    }

    return (
        <div className='App col card p-40'>
            <section className='heading'>
                <h1>Welcome {user && user.fullName}</h1>
            </section>
            <header>
                <h1 className='card-header'>Exam Form</h1>
            </header>
            <form className='col card p-40' onSubmit={handleSubmit}>
                <label> Title:
                    <Medium id='title' ref={titleRef} name='title' type='text' onInput={updateField} />
                </label>

                <label className='m-2 p-1' htmlFor='description'> Description:</label>
                <textarea id='description' ref={descriptionRef} className='m-2' name='description' onInput={updateField} />

                <Success type="submit">Submit</Success>
            </form>
        </div>
    );
}
