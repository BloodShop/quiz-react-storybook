import { date } from '@storybook/addon-knobs';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Large } from '../examPage/input/input.stories';
import Moment from 'moment';
import { Primary } from '../examPage/button/button.stories';

export default function ExamsPage({ exams, setExams }) {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <Large type='search' placeholder='Search Exam By Name' />
            </div>
            <nav>
                <Link to={'featured'} >Featured</Link>
                <Link to={'new'} >New</Link>
            </nav>
            <div className={`row row-cols-md-3 g-4`}>
                {exams.map((exam, index) => (
                    <div key={index} className='col card p-40'>
                        <h2 className='card-header'>{exam.id}. {exam.title}</h2>
                        <p>{exam.description}</p>
                        <h3>{Moment(exam.releasedDate).format('DD-MM-YYYY')}</h3>
                        <Primary onClick={() => navigate(`${exam.id}`)} >Quiz Me</Primary>
                    </div>)
                )}
            </div>
            {/* <Outlet /> */}
        </>
    )
}
