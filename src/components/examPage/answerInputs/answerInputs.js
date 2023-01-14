import React, { useEffect, useState } from 'react';
import AnswerInput from '../answerInput/answerInput';

export default function AnswerInputs({ onInput, question }) {

  const [answers, setAnswers] = useState(question.answers);

  useEffect(() => {
    console.log('!!!', 'qa');

    setAnswers(question.answers);
  }, [question])

  return (
    <>
        <label className='col'>Answers:
        {[0, 1, 2, 3].map((n, i) => <AnswerInput key={i} name={`answer${i}`} type='text'
          onInput={onInput} value={answers[i] ? answers[i]?.txt : null} />)}
        </label>
        <label className='m-2'>Correct Answer:
            <AnswerInput name='correctAnswer' type='text' onInput={onInput} value={question.correctAnswer}/>
        </label>
    </>
  )
}
