import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Large } from '../components/input/input.stories';
import { Success } from '../components/button/button.stories';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExam, getExams, reset } from '../features/exams/examSlice';
import Spinner from '../components/Spinner';
import ExamItem from '../components/ExamItem';

export default function ExamsArchive() {

    const [query, setQuery] = useState(''),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        { user } = useSelector((state) => state.auth),
        { exams, isLoading, isError, message } = useSelector((state) => state.exams);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getExams());

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch])

    const deleteExamHandler = (id) => {
        dispatch(deleteExam(id));
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='App'>
            <div className='inline'>
                <Large type='search' placeholder='Search Exam By Name' onChange={event => setQuery(event.target.value)} />
                {user.role !== 'student' ? <Success onClick={(() => navigate('/add-exam'))}>Add Exam</Success> : ''}
            </div>
            <div className={`row row-cols-md-3 g-4`}>
                {exams.length > 0 ? exams
                    .filter(exam => query === '' ? exam : (exam.title.toLowerCase().includes(query.toLowerCase()) ? exam : ''))
                    .map(exam => <ExamItem key={exam._id} exam={exam} deleteExam={deleteExamHandler} />) : (<h3>You have no exams</h3>)
                }
            </div>
        </div>
    )
}
