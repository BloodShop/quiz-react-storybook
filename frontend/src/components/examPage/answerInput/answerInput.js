import React from 'react';
import { Small } from '../../input/input.stories';

export default function AnswerInput({ key, name, type, onInput, value }) {
  return (
    <Small key={key} name={name} type={type} onInput={onInput} value={value} />
  );
}
