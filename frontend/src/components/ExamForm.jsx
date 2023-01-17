import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createExam } from '../features/exams/examSlice'
import { Success } from './button/button.stories';
import { Medium } from './input/input.stories';

export default function ExamForm() {
    const [exam, setExam] = useState([]),
        dispatch = useDispatch(),
        navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(exam?.title === '' || exam?.description === '') {
            return;
        }

        dispatch(createExam({ ...exam, releasedDate: Date.now(), questions: [] }))
            .then(data => {navigate(`/exams/${data.payload._id}`)});
    }

    const updateField = (e) => {
        const newExam = {...exam};
        newExam[e.target.name] = e.target.value;
        console.log(e.target.name, newExam[e.target.name]);

        setExam(newExam);
    }

    return (
        <section className='form'>
            <form className='col card p-40' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Title:
                        <Medium id='title' name='title' type='text' onInput={updateField} />
                    </label>
                </div>
                <div className='form-group'>
                    <label className='m-2 p-1' htmlFor='description'> Description:</label>
                    <textarea id='description' className='m-2' name='description' onInput={updateField} />

                    <Success type="submit">Submit</Success>
                </div>
            </form>
        </section>
    )
}
