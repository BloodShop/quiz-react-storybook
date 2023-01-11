import React from 'react'
import { Danger, Primary, Secondary } from '../examPage/button/button.stories';
import { useNavigate } from 'react-router-dom';

export default function ExamResult(props) {
    const navigate = useNavigate(),
        { correctAnswers, totalQuestions } = props;
    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
            <Secondary onClick={() => navigate(-2)}>Go back</Secondary>
            <Danger onClick={() => navigate(-1)}>Review results</Danger>
            <Primary>Go Learn something</Primary>
        </>
    );
}
