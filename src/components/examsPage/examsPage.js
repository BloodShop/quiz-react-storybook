import { date } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Large } from '../examPage/input/input.stories';
import Moment from 'moment';
import { Danger, Primary, Secondary, Success } from '../examPage/button/button.stories';
import ExamService from '../../services/exams.service';

export default function ExamsPage() {

    const navigate = useNavigate(),
        [exams, setExams] = useState([]),
        service = new ExamService();

    const getExamsFromService = () => {
        service.getExams()
            .then(res => setExams(res))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getExamsFromService();
    }, []);

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

    const addExam = () => {
        const tempExam = {
            "id": 3,
            "title": "exam3 - React app",
            "releasedDate": "2018-12-10T13:45:00.000Z",
            "description": "LoL Dodge Game is a training tool for famous moba games like League of Legends you can improve your mechanics or just warmup by playing one of our Games.",
            "questions": [
                {
                    "id": 1,
                    "title": "Just the first question",
                    "description": "What`s your favorite way to spend a day off?",
                    "answers": [
                        {
                            "txt": "Football",
                            "selected": false
                        },
                        {
                            "txt": "Learn c#",
                            "selected": false
                        },
                        {
                            "txt": "play cs-go",
                            "selected": false
                        },
                        {
                            "txt": "sleep",
                            "selected": false
                        }
                    ],
                    "correctAnswer": "play cs-go"
                },
                {
                    "id": 2,
                    "title": "Just the second question",
                    "description": "What type of music are you into?",
                    "answers": [
                        {
                            "txt": "Rap",
                            "selected": false
                        },
                        {
                            "txt": "Rock Metal",
                            "selected": false
                        },
                        {
                            "txt": "Just Metal",
                            "selected": false
                        },
                        {
                            "txt": "Proper Metal",
                            "selected": false
                        }
                    ],
                    "correctAnswer": "Rap"
                },
                {
                    "id": 3,
                    "title": "What was the last thing you`ve done?",
                    "description": "you had wasted time on something before your shitty work, what would it be?",
                    "answers": [
                        {
                            "txt": "Kill myself",
                            "selected": false
                        },
                        {
                            "txt": "Dream of a better friend",
                            "selected": false
                        },
                        {
                            "txt": "Send nudes to my crush",
                            "selected": false
                        },
                        {
                            "txt": "I would think of how could I encourage my friends go to educate at Sela College",
                            "selected": false
                        }
                    ],
                    "correctAnswer": "Send nudes to my crush"
                }
            ]
        }

        let newExam = {...tempExam, id: 0 };
        service.postExam(newExam)
            .then(data => setExams([...exams, data]));
    }

    /* const getExamsAsync = async () => {
        try {
            let data = await service.getExams();
            setExams(data);
        } catch (err) {
            console.log(err);
        }
    } */

    return (
        <div className='App'>
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
                        <h2 className='card-header'>{index + 1}. {exam.title} - {exam.id}</h2>
                        <p>{exam.description}</p>
                        <h3>{Moment(exam.releasedDate).format('DD-MM-YYYY')}</h3>
                        <Primary onClick={() => navigate(`${exam.id}`)} >Quiz Me</Primary>
                        <Danger onClick={() => deleteExam(exam.id)} >Delete</Danger>
                        <Secondary onClick={() => updateExam(exam)} >Update</Secondary>
                    </div>)
                )}
            </div>
            <Success onClick={addExam}>Add Exam</Success>
            {/* <Outlet /> */}
        </div>
    )
}
