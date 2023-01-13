import React, { useEffect, useState } from 'react'
import { Primary, Secondary } from '../button/button.stories';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ExamResult() {
    const navigate = useNavigate(),
        { state } = useLocation(),
        [correctAnswers, setCorrectAnswers] = useState(),
        [totalQuestions, setTotalQuestions] = useState();

    useEffect(() => {
        console.log(state);
        if (!state?.formSubmitted) {
            navigate(-1);
        } else {
            console.log('!!!');
            setCorrectAnswers(state?.correctAnswers);
            setTotalQuestions(state?.totalQuestions);
        }
    }, []);

    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
            <Secondary onClick={() => navigate('/exams')}>Go back</Secondary>
            {/* <Danger onClick={() => navigate()}>Try again</Danger> */}
            <Primary>Go Learn something</Primary>
        </>
    );
}
