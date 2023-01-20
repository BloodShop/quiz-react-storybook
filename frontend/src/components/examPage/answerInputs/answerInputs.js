import React, { useEffect, useState } from 'react';
import AnswerInput from '../answerInput/answerInput';
import './answerInputs.css';
import { Increment, Decrement, reset } from '../../../features/counter/counterSlice';
import { AddIcon, ResetIcon, SubIcon } from '../../Icon/icon.stories';
import { useDispatch } from 'react-redux';
import {v4 as uuid} from 'uuid';

export default function AnswerInputs({ numOfAnswers, onInput, question }) {

  const [answers, setAnswers] = useState(question.answers),
    dispatch = useDispatch();

  useEffect(() => {
    setAnswers(question.answers);
  }, [question])

  return (
    <>
        <label className='col'>Answers:
          <AddIcon onClick={() => dispatch(Increment())}/>
          <SubIcon onClick={() => dispatch(Decrement())}/>
          <ResetIcon onClick={() => dispatch(reset())}/>
        {[...Array(numOfAnswers)].map((n, i) => <AnswerInput key={answers[i]?._id} name={`answer${i}`} type='text'
          onInput={onInput} value={answers[i] ? answers[i]?.txt : ''} />)}
        </label>
        <label className='col'>
          Correct Answer:
          <select className='select-box' name='correctAnswer' value={question.correctAnswer} onInput={onInput}>
            <option onInput={onInput} value={''}> --- Please Select --- </option>
            {[...Array(numOfAnswers)].map((n, i) => <option key={answers[i]?._id} onInput={onInput} value={answers[i]?.txt}>{answers[i]?.txt}</option>)}
          </select>
        </label>
    </>
  )
}
