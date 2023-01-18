import React, { useEffect, useState } from 'react'
import { PrimaryBtn, SecondaryBtn } from '../../button/button.stories';
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
            setCorrectAnswers(state?.correctAnswers);
            setTotalQuestions(state?.totalQuestions);
        }
    }, []);

    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
            <SecondaryBtn onClick={() => navigate('/exams')}>Go back</SecondaryBtn>
            {/* <DangerBtn onClick={() => navigate()}>Try again</DangerBtn> */}
            <PrimaryBtn>Go Learn something</PrimaryBtn>
        </>
    );
}
