import React from 'react'
import { Primary, Secondary } from '../examPage/button/button.stories';
import { useNavigate } from 'react-router-dom';

export default function ExamResult({ correctAnswers, totalQuestions }) {
    const navigate = useNavigate();
    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
            <Secondary onClick={() => navigate(-1)}>Go back</Secondary>
            <Primary>Go Learn something</Primary>
        </>
    );
}
