import { date } from '@storybook/addon-controls';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Large } from '../components/examPage/input/input.stories';
import Moment from 'moment';
import { Danger, Primary, Secondary, Success } from '../components/examPage/button/button.stories';
import ExamService from '../services/exams.service';

export default function ExamsArchive() {

    const navigate = useNavigate(),
        [exams, setExams] = useState([]),
        [query, setQuery] = useState(''),
        service = new ExamService();

    useEffect(() => getExamsFromService(), []);

    const getExamsFromService = () => {
        service.getExams()
            .then(res => setExams(res))
            .catch(err => console.log(err));
    }

    const deleteExam = (id) => {
        service.deleteExam(id)
            .then(data => {
                let updatedExams = [...exams];
                setExams(updatedExams.filter(exam => exam.id !== id));
            });
    }

    const updateExam = (exam) => {
        let newExam = {...exam, title: 'walla lo' };
        service.putExam(newExam)
            .then(data => getExamsFromService());
    }

    return (
        <div className='App'>
            <div className='inline'>
                <Large type='search' placeholder='Search Exam By Name' onChange={event => setQuery(event.target.value)} />
                <Success onClick={(() => navigate('/add-exam'))}>Add Exam</Success>
            </div>
            {/* <nav>
                <Link to={'featured'} >Featured</Link>
                <Link to={'new'} >New</Link>
            </nav> */}
            <div className={`row row-cols-md-3 g-4`}>
                {exams
                    .filter(exam => query === '' ? exam : (exam.title.toLowerCase().includes(query.toLowerCase()) ? exam : ''))
                    .map((exam, index) => (
                        <div key={index} className='col card p-40'>
                            <h2 className='card-header'>{index + 1}. {exam.title}</h2>
                            <p>{exam.description}</p>
                            <h3>{Moment(exam.releasedDate).format('DD-MM-YYYY')}</h3>
                            <div className='footer'>
                                <Primary onClick={() => navigate(`${exam.id}`)} >Quiz Me</Primary>
                                <Danger onClick={() => deleteExam(exam.id)} >Delete</Danger>
                            </div>
                        </div>))}
            </div>
            {/* <Outlet /> */}
        </div>
    )
}
