import React, { useState } from 'react';
import AnswerInputs from '../answerInputs/answerInputs';
import { PrimaryBtn } from '../../button/button.stories';
import { Large } from '../../input/input.stories';
import { useSelector } from "react-redux";
import TextArea from '../../textArea/textArea';

export default function AddQuestion({ onAdd }) {

    const [question, setQuestion] = useState({
            title: '',
            description: '',
            answers: [],
            correctAnswer: ''
        }),
        { counter } = useSelector(state => state.counter);

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
        <div className='App col p-3 m-3 card bg-secondary'>
            <h2 className='card-header bg-dark text-white' >Add Question</h2>
            <label>Title:
                <Large name='title' type='text' onInput={addQuestionHandler} />
            </label>
            <label className='m-2 p-1' htmlFor='description'>Description:</label>
                <TextArea className='m-2' name='description' onInput={addQuestionHandler} />
            <AnswerInputs numOfAnswers={counter} onInput={addQuestionHandler} question={question} />
            <PrimaryBtn onClick={() => onAdd(question, counter)}>Add Question</PrimaryBtn>
        </div>
    );
}
