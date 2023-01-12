import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ExamService from '../../services/exams.service'
import { Success } from '../examPage/button/button.stories';
import { Large, Medium, Small } from '../examPage/input/input.stories';

export default function AddExam() {

    const service = new ExamService(),
        navigate = useNavigate(),
        [exam, setExam] = useState([]);

    const titleRef = useRef(),
        descriptionRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        let newExam = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            releasedDate: Date.now(),
            questions: []
        }

        service.postExam({ ...newExam, id: 0 })
            .then(data => navigate(`/exams/${data.id}`));
    }

    const updateField = (event) => {

    }

    return (
        <div className='App col card p-40'>
            <header>
                <h1 className='card-header'>Exam Form</h1>
            </header>
            <form className='col card p-40' onSubmit={handleSubmit}>
                <label> Title:
                    <Medium id='title' ref={titleRef} name='title' type='text' onChange={updateField} />
                </label>

                <label className='m-2 p-1' htmlFor='description'> Description:</label>
                <textarea id='description' ref={descriptionRef} className='m-2' name='description' />

                <Success type="submit">Submit</Success>
            </form>
        </div>
    );
}
