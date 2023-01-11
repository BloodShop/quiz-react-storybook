import React, { useState } from 'react';
import { Danger } from '../button/button.stories';
import { RadioInput, Small } from '../input/input.stories';
import style from './question.module.css';

export default function Question({ question, questionIndex, onChange, onRemove, isSubmitted }) {

    const [currentAnswer, setCurrentAnswer] = useState();

    const onSelect = (e) => {
        let selectedQ = {...question};
        selectedQ.answers.map(s => { s.selected = false; });

        const selectedA = selectedQ.answers.find(answer => answer.txt === e.target.value);
        selectedA.selected = true;

        console.log(e.target);

        setCurrentAnswer(e.target.value);
        onChange(selectedQ);
    }

    return (
        <div className='col card p-40'>
            <div>
                <h2 className='card-header'>{questionIndex + 1}. {question.title}</h2>
                <Danger className={`button danger ${isSubmitted ? style.display : style.non_display}`} onClick={() => onRemove(question.id)}>Delete question ❌</Danger>{/* btn danger */}
            </div>
            <h2 className='lead mx-auto'>{question.description}</h2>

            <div className='btn-group btn-group-vertical'>
                {question.answers.map((answer, index) => <label key={Math.random()*10000}>
                        <RadioInput value={answer.txt} key={Math.random()*1000} checked={currentAnswer===answer.txt} onChange={onSelect}/><i className={question.correctAnswer === answer.txt ? style.correct : style.wrong}><span>{answer.txt}</span></i>
                    </label>)}
                {/* <label hidden value={question.correctAnswer}></label> */}
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
