import React from 'react';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { DangerBtn, PrimaryBtn } from './button/button.stories';

export default function ExamItem({ exam, deleteExam }) {

    const navigate = useNavigate();

    return (
        <div className='col card p-40'>
            <h2 className='card-header'>{exam.title}</h2>
            <div>{Moment(exam.releasedDate).toLocaleString('en-US')}</div>
            <div>{`Number of Q: ${exam.questions.length}`}</div>
            <p>{exam.description}</p>
            <div className='footer'>
                <PrimaryBtn onClick={() => navigate(`${exam._id}`)} >Quiz Me</PrimaryBtn>
                <DangerBtn onClick={() => deleteExam(exam._id)} >Delete</DangerBtn>
            </div>
        </div>
    )
}
