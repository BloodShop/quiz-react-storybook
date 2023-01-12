import React, { useState } from 'react'
import AddQuestion from '../addQuestion/addQuestion';
import { Secondary, Success } from '../button/button.stories';
import Question from '../question/question';
import style from '../question/question.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ExamResult from '../../examResult/examResult';
import { useAuth } from '../../auth/auth';

export default function QuestionList({ questionsP }) {

    /* const [questions, setQuestions] = useState([
        {
            id: 1,
            title: 'Just the first question',
            description: 'What`s your favorite way to spend a day off?',
            answers: [
                { txt: 'Football', selected: false },
                { txt: 'Learn c#', selected: false },
                { txt: 'play cs-go', selected: false },
                { txt: 'sleep', selected: false }
            ],
            correctAnswer: 'play cs-go'
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
            description: 'you had wasted time on something before your shitty work, what would it be?',
            answers: [
                { txt: 'Kill myself', selected: false },
                { txt: 'Dream of a better friend', selected: false },
                { txt: 'Send nudes to my crush', selected: false },
                { txt: 'I would think of how could I encourage my friends go to educate at Sela College', selected: false }
            ],
            correctAnswer: 'Send nudes to my crush'
        },
    ]); */
    const [correctAnswers, setCorrectAnswer] = useState(0),
        [questions, setQuestions] = useState(questionsP),
        [questionsLength, setQuestionsLength] = useState(questions.length),
        [styleSubmit, setStyleSubmit] = useState(''),
        navigate = useNavigate(),
        auth = useAuth();

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
        debugger;
        const none = (arr, callback) => !arr.some(callback);
        let confirmed = true;

        none(questions, q => {
            if(none(q.answers, a => a.selected)) {
                if (!window.confirm('Not all questions are answered dumbass!\nAre you sure you want to submit the exam?!')) {
                    confirmed = false;
                }
                return true;
            };
            return false;
        });
        if (confirmed) {
            checkQuestions(questions);
            setStyleSubmit(style.submitted);
        }

        navigate('result', { state: { correctAnswers: correctAnswers, totalQuestions: questionsLength } });
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

        setCorrectAnswer(newCorrectAnswers);
        setQuestionsLength(quests.length);
    }

    return (
        <>
            <div className={`row row-cols-md-1 g-4 ${styleSubmit}`}>
                {questions.map((question, index) => <Question question={question} questionIndex={index} key={index}
                        onChange={changeHandler} onRemove={removeHandler} isSubmitted={!!styleSubmit} />)}
            </div>
            <Success onClick={onSubmit} >Submit Exam ✅</Success>
            <Secondary onClick={onReset} >Reset Answers ⌛</Secondary>
            {/* <ExamResult correctAnswers={correctAnswers} totalQuestions={questionsLength}/> */}
            {auth.user && <AddQuestion onAdd={addQuestionHandler}/>}
            <Outlet />
        </>
    );
}
