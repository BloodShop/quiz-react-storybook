import React from 'react';

export default function AnswerInput({ name, type, onInput }) {
  return (
    <input name={name} type={type} onInput={onInput}/>
  );
}
