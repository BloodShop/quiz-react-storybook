import React from 'react'
import { Danger, Primary, Secondary } from '../examPage/button/button.stories';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ExamResult() {
    const navigate = useNavigate(),
        location = useLocation(),
        { correctAnswers, totalQuestions } = location.state;

    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
            <Secondary onClick={() => navigate(-2)}>Go back</Secondary>
            <Danger onClick={() => navigate(-1)}>Try again</Danger>
            <Primary>Go Learn something</Primary>
        </>
    );
}
