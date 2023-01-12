import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ExamService from '../../../services/exams.service';
import AnswerInputs from '../answerInputs/answerInputs';
import { Primary } from '../button/button.stories';
import { Large, Medium, Small } from '../input/input.stories';

export default function AddQuestion(/* { onAdd } */) {

    const service = new ExamService(),
        params = useParams(),
        [exam, setExam] = useState(),
        [question, setQuestion] = useState({
            title: '',
            description: '',
            answers: [
                /* { txt: '', selected: false },
                { txt: '', selected: false },
                { txt: '', selected: false },
                { txt: '', selected: false } */
            ],
            correctAnswer: '-1'
        });

        useEffect(() => {
            /* debugger */
            service.getExamById(params.id)
                    .then(res => setExam(res))
                    .catch(err => console.log(err));;
        }, [])

    const onAdd = () => {
        /* Question validation */
        if (question.title === '' || question.description === '' || question.answers.length !== 4 ||
            !question.answers.some(a => a.txt === question.correctAnswer) ||
            question.answers.length !== new Set(question.answers.map(a => a.txt)).size) return;

        /* debugger */
        let examToUpdate = {...exam};
        examToUpdate.questions.push({ id: Math.round(Math.random() * 100000) ,...question });
        service.putExam(examToUpdate)
            .then(res => {
                console.log(examToUpdate);
                setExam(examToUpdate);
            });
    }

    const addQuestionHandler = (e) => {
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

    return (
        <div className='App col card p-40'>
            <h2 className='card-header' >Add Question</h2>
            <label>Title:
                <Large name='title' type='text' onInput={addQuestionHandler} />
            </label>
            <label className='m-2 p-1' htmlFor='description'>Description:</label>
                <textarea className='m-2' name='description' onInput={addQuestionHandler} />
            <AnswerInputs onInput={addQuestionHandler} onAdd={onAdd} question={question} />
            <Primary onClick={onAdd}>Add Question</Primary>
        </div>
    );
}
