import React, { useState } from 'react'
import AnswerInputs from '../answerInputs/answerInputs';
import { Primary } from '../button/button.stories';
import { Large, Medium, Small } from '../input/input.stories';

export default function AddQuestion({ onAdd }) {


    const [question, setQuestion] = useState({
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
        <div className='col card p-40'>
            <h2 className='card-header' >Add Question</h2>
            <label>Title:
                <Large name='title' type='text' onInput={addQuestionHandler} />
            </label>
            <label className='m-2 p-1' htmlFor='description'>Description:</label>
                <textarea className='m-2' name='description' onInput={addQuestionHandler} />
            <AnswerInputs onInput={addQuestionHandler} onAdd={onAdd} question={question} />
            <Primary onClick={() => onAdd(question)}>Add Question</Primary>
        </div>
    );
}
