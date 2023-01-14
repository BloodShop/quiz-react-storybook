import React, { useState } from 'react';
import AnswerInput from '../answerInput/answerInput';

export default function AnswerInputs({ onInput, question }) {

  const [answers, setAnswers] = useState(question.answers);

  return (
    <>
        <label className='col'>Answers:
        {[0, 1, 2, 3].map((n, i) => <AnswerInput key={answers[i]?.txt+[i]} name={`answer${i}`} type='text'
          onInput={onInput} value={answers[i] ? answers[i]?.txt : ''} />)}
        </label>
        <label className='m-2'>Correct Answer:
            <AnswerInput name='correctAnswer' type='text' onInput={onInput} value={question.correctAnswer}/>
        </label>
    </>
  )
}
