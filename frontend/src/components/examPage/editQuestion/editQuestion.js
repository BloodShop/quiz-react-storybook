import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AnswerInputs from '../answerInputs/answerInputs';
import { PrimaryBtn } from '../../button/button.stories';
import { Large } from '../../input/input.stories';
import { useDispatch, useSelector } from 'react-redux';
import { getExamById } from '../../../features/exams/singleExamSlice';
import { updateExam } from '../../../features/exams/examSlice';
import TextArea from '../../textArea/textArea';
import { SetCounter } from '../../../features/counter/counterSlice';
import Spinner from '../../Spinner';

export default function EditQuestion() {

    const params = useParams(),
        { state } = useLocation(),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        // [exam, setExam] = useState(null),
        { exam, isLoading, message, isError } = useSelector(state => state.exam),
        [question, setQuestion] = useState(null),
        { counter } = useSelector(state => state.counter);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (params && !exam) {
            dispatch(getExamById(params.id));
        }

        if (exam) {
            setQuestion(exam?.questions?.find(q => q._id == params.qid)); /* equallity by type && value */
        }

        if (question) {
            dispatch(SetCounter(question.answers.length));
        }
    }, [params, exam, question, isError, message, dispatch]);

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

        let examToEdit = {...structuredClone(exam)}
        let index = examToEdit.questions.indexOf(examToEdit.questions.find(q => q.id == question.id));
        examToEdit.questions[index] = question;
        dispatch(updateExam(examToEdit));
        navigate(`/exams/${exam.id}`)
    }

    if (!question || isLoading || counter < 2) {
        return <Spinner />
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
                    <TextArea className='m-2' value={question.description} name='description' onInput={editQuestionHandler} />
                    <AnswerInputs numOfAnswers={counter} onInput={editQuestionHandler} question={question} />
                    <PrimaryBtn onClick={editQuestion}>Edit Question</PrimaryBtn>
                </div>
            }
        </>
    );
}
