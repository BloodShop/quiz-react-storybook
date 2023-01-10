import React, { useState } from 'react'
import AddQuestion from '../addQuestion/addQuestion';
import ExamResult from '../examResult/examResult';
import Question from '../question/question';
import style from '../question/question.module.css';

export default function QuestionList() {

    const [questions, setQuestions] = useState([
        {
            id: 1,
            title: 'Just the first question',
            description: 'What`s your favorite way to spend a day off?',
            answers: [
                { txt: 'Football', selected: false },
                { txt: 'Learn c#', selected: false },
                { txt: 'cs-go', selected: false },
                { txt: 'sleep', selected: false }
            ],
            correctAnswer: 'cs-go'
        },
        {
            id: 2,
            title: 'Just the second question',
            description: 'What type of music are you into?',
            answers: [
                { txt: 'Rap', selected: false },
                { txt: 'Rock Metal', selected: false },
                { txt: 'Just Metal', selected: false },
                { txt: 'Proper Metal', selected: false }
            ],
            correctAnswer: 'Rap'
        },
        {
            id: 3,
            title: 'What was the last thing you`ve done?',
            description: 'you had wasted time on something before you shitty work, what would it be?',
            answers: [
                { txt: 'Kill myself', selected: false },
                { txt: 'Dream of a better lecturer', selected: false },
                { txt: 'Send nudes to my crash', selected: false },
                { txt: 'I would think of how could I encourage my friends go to educate at Sela College', selected: false }
            ],
            correctAnswer: 'Send nudes to my crash'
        },
    ]);
    const [correctAnswers, setCorrentAnswer] = useState(0);
    const [questionsLength, setQuestionsLength] = useState(questions.length);
    const [styleSubmit, setStyleSubmit] = useState('');
    const changeHandler = (question) => {
        let questionIndex = questions.findIndex(q => q.id === question.id);
        let newQuestions = [...questions];
        newQuestions[questionIndex] = question;
        setQuestions(newQuestions);
    }

    const removeHandler = (id) => {
        /* debugger; */
        let filteredQuestions = [...questions.filter(q => q.id !== id)];
        setQuestions(filteredQuestions);
        checkQuestions(filteredQuestions);
    }

    const addQuestionHandler = (question) => {
        /* Question validation */
        if (question.title === '' || question.description === '' || question.answers.length !== 4 ||
            !question.answers.some(a => a.txt === question.correctAnswer) ||
            question.answers.length !== new Set(question.answers.map(a => a.txt)).size) return;

        const newQuestion = {id: Math.round(Math.random() * 100000) ,...question},
            newQuestions = [...questions, newQuestion];
        setQuestions(newQuestions);
        checkQuestions(newQuestions);
    }

    const onReset = () => {
        setStyleSubmit();
    }

    const onSubmit = () => {
        /* debugger; */
        checkQuestions(questions);
        setStyleSubmit(style.submitted);

        /* document.querySelector('[name="results"]').innerHTML = `<div>${correctAnswers} / ${length}</div>
            <div>Final Result: ${(correctAnswers / length * 100)}</div>`; */
    }

    const checkQuestions = (quests) => {
        let newCorrectAnswers = 0;
        quests.map(q => {

            let indexA = q.answers.findIndex(s => s.selected === true);
            if (indexA !== -1 && q.answers[indexA].txt === q.correctAnswer) {
                newCorrectAnswers++;
            } else {
                return;
            }
        });

        setCorrentAnswer(newCorrectAnswers);
        setQuestionsLength(quests.length);
    }

    return (
        <>
            <div className={`row row-cols-1 row-cols-md-3 g-4 ${styleSubmit}`}>
                {questions.map((question, index) => <Question question={question} questionIndex={index} key={index}
                        onChange={changeHandler} onRemove={removeHandler} isSubmitted={!!styleSubmit} />)}
            </div>
            <button onClick={onSubmit} className='btn btn-primary m-1'>Submit Exam ✅</button>
            <button onClick={onReset} className='btn btn-secondary m-1'>Reset Answers ⌛</button>
            <ExamResult correctAnswers={correctAnswers} totalQuestions={questionsLength}/>
            <AddQuestion onAdd={addQuestionHandler}/>
        </>
    );
}
