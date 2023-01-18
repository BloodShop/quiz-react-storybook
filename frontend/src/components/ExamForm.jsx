import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createExam, reset } from '../features/exams/examSlice'
import { Success } from './button/button.stories';
import { Medium } from './input/input.stories';

export default function ExamForm() {
    const { exam, isLoading, isError, message } = useSelector((state) => state.exams),
        { user } = useSelector((state) => state.auth),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        [title, setTitle] = useState(''),
        [description, setDescription] = useState('');

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, isLoading, isError, message, dispatch, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title === '' || description === '') {
            return;
        }

        dispatch(createExam({ title: title, description: description, releasedDate: Date.now(), questions: [] }))
            .then(data => navigate(`/exams/${data.payload._id}`));
    }

    return (
        <section className='form'>
            <form className='col card p-40' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Title:
                        <Medium id='title' name='title' type='text' onInput={(e) => setTitle(e.target.value)} />
                    </label>
                </div>
                <div className='form-group'>
                    <label className='m-2 p-1' htmlFor='description'> Description:</label>
                    <textarea id='description' className='m-2' name='description' onInput={(e) => setDescription(e.target.value)} />

                    <Success type="submit">Submit</Success>
                </div>
            </form>
        </section>
    )
}
