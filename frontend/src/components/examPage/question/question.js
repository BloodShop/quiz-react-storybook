import React, { useState } from 'react';
import { DeleteIcon, EditIcon } from '../../Icon/icon.stories';
import { RadioInput } from '../../input/input.stories';
import style from './question.module.css';

export default function Question({ question, questionIndex, onChange, onRemove, onEdit, isSubmitted }) {

    const [currentAnswer, setCurrentAnswer] = useState();

    const onSelect = (e) => {
        let selectedQ = {...structuredClone(question)};
        selectedQ.answers.map(s => { s.selected = false; });

        const selectedA = selectedQ.answers.find(answer => answer.txt === e.target.value);
        selectedA.selected = true;

        setCurrentAnswer(e.target.value);
        onChange(selectedQ);
    }

    return (
        <div key={question._id} className='col card p-40'>
            <div>
                <h2 className='card-header'>{questionIndex + 1}. {question.title}</h2>
                {isSubmitted &&
                    <>
                        <DeleteIcon onClick={() => onRemove(question._id)}>❌</DeleteIcon>
                        <EditIcon onClick={() => onEdit(question._id)}>✍️</EditIcon>
                    </>
                }

            </div>
            <h2 className='lead mx-auto'>{question.description}</h2>

            <div className='btn-group btn-group-vertical'>
                {question.answers.map((answer) => <label key={answer._id}>
                        <RadioInput key={answer._id} value={answer.txt} checked={currentAnswer===answer.txt} onChange={onSelect}/><i className={question.correctAnswer === answer.txt ? style.correct : style.wrong}><span>{answer.txt}</span></i>
                    </label>)}
            </div>
        </div>
    );
}

Question.defaultProps = {
    question: {
        title: 'unknown',
        description: '',
        answers: [ ],
        correctAnswer: ''
    }
};
