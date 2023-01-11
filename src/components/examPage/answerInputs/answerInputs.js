import React from 'react';
import AnswerInput from '../answerInput/answerInput';

export default function AnswerInputs({ onInput, onAdd, question }) {
  return (
    <>
        <label className='col'>Answers:
            <AnswerInput name='answer0' type='text' onInput={onInput} />
            <AnswerInput name='answer1' type='text' onInput={onInput} />
            <AnswerInput name='answer2' type='text' onInput={onInput} />
            <AnswerInput name='answer3' type='text' onInput={onInput} />
        </label>
        <label className='m-2'>Correct Answer:
            <AnswerInput name='correctAnswer' type='text' onInput={onInput} />
        </label>
    </>
  )
}
