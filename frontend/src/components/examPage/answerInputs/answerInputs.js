import React, { useEffect, useState } from 'react';
import AnswerInput from '../answerInput/answerInput';
import './answerInputs.css';

export default function AnswerInputs({ onInput, question }) {

  const [answers, setAnswers] = useState(question.answers);

  useEffect(() => {
    setAnswers(question.answers);
  }, [question])

  return (
    <>
        <label className='col'>Answers:
        {[0, 1, 2, 3].map((n, i) => <AnswerInput key={i} name={`answer${i}`} type='text'
          onInput={onInput} value={answers[i] ? answers[i]?.txt : ''} />)}
        </label>
        <label className='col'>
          Correct Answer:
          <select className='select-box' name='correctAnswer' value={question.correctAnswer} onInput={onInput}>
            {[0, 1, 2, 3].map((n, i) => <option key={i} onInput={onInput} value={answers[i]?.txt}>{answers[i]?.txt}</option>)}
          </select>
        </label>

        {/* <label className='m-2'>Correct Answer:
            <AnswerInput name='correctAnswer' type='text' onInput={onInput} value={question.correctAnswer}/>
        </label> */}
    </>
  )
}
