import React, { useState } from 'react'
import QuestionList from './questionList/questionList'
import { style } from './examPage.css';

export default function ExamPage({ exam, setExam }) {
    const [questions, setQuestions] = useState(exam.questions);
  return (
    <div className='App'>
        <header>
            <h1>{exam.title}</h1>
        </header>
        <QuestionList questions={questions} setQuestions={setQuestions}/>
    </div>
  );
}
