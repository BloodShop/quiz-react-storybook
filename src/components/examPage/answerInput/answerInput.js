import React from 'react';
import { Small } from '../input/input.stories';

export default function AnswerInput({ name, type, onInput }) {
  return (
    <Small name={name} type={type} onInput={onInput}/>
  );
}
