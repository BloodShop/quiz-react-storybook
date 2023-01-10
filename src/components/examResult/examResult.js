import React from 'react'

export default function ExamResult({ correctAnswers, totalQuestions }) {
    return (
        <>
            <h2>Exam Results:</h2>
            <div>{correctAnswers} / {totalQuestions}</div>
            <div>Grade: {correctAnswers / totalQuestions * 100}</div>
        </>
    );
}
