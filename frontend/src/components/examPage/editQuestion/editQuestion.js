import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExamService from '../../../services/exams.service';
import { useAuth } from '../../auth/auth';
import AnswerInputs from '../answerInputs/answerInputs';
import { PrimaryBtn } from '../../button/button.stories';
import { Large } from '../../input/input.stories';
import { useDispatch } from 'react-redux';
import { getExamById, updateExam } from '../../../features/exams/examSlice';

export default function EditQuestion() {

    const service = new ExamService(),
        auth = useAuth(),
        params = useParams(),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        { state } = useLocation(),
        [exam, setExam] = useState(),
        [question, setQuestion] = useState();

    useEffect(() => {
        dispatch(getExamById(params.id))
            .then(res => setExam(res.payload));
        // service.getExamById(params.id)
        //     .then(res => setExam(res))
        //     .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        setQuestion(exam?.questions?.find(q => q._id == params.qid)); /* equallity by type && value */
    }, [exam]);

    const editQuestionHandler = (e) => {

        const newQuestion = {...structuredClone(question)},
            txt = e.target.value;

        if (e.target.name.includes('answer')) {
            const num = e.target.name.match(/[0-9]+$/)[0];

            console.log('!!!!!!', num, newQuestion['answers'][num]);

            if (num) {
                newQuestion['answers'][num] = { txt: txt, selected: false };
            }
        } else {
            newQuestion[e.target.name] = txt;
        }

        setQuestion(newQuestion);
    }

    const editQuestion = () => {
        console.log(state);

        let examToEdit = {...exam}
        let index = examToEdit.questions.indexOf(examToEdit.questions.find(q => q.id == question.id));
        examToEdit.questions[index] = question;
        dispatch(updateExam(examToEdit));
        // service.putExam(examToEdit)
        //     .then((res) => console.log(res));
        navigate(`/exams/${exam.id}`)
    }

    return (
        <>
            {question &&
                <div className='App col p-3 m-3 card bg-secondary'>
                    <h2 className='card-header bg-dark text-white' >Edit Question</h2>
                    <label>Title:
                        <Large name='title' type='text' onInput={editQuestionHandler} value={question.title} />
                    </label>
                    <label className='m-2 p-1' htmlFor='description'>Description:</label>
                    <textarea className='m-2' value={question.description} name='description' onInput={editQuestionHandler} />
                    <AnswerInputs onInput={editQuestionHandler} question={question} />
                    <PrimaryBtn onClick={editQuestion}>Edit Question</PrimaryBtn>
                </div>
            }
        </>
    );
}
