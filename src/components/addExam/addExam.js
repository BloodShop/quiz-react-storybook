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

    const handleSubmit = (e) => {
        e.preventDefault();
        /* let newExam = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            releasedDate: Date.now(),
            questions: []
        } */

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
