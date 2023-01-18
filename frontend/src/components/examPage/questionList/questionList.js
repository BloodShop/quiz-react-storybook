import React, { useState, useEffect } from 'react'
import AddQuestion from '../addQuestion/addQuestion';
import { Success } from '../../button/button.stories';
import Question from '../question/question';
import style from '../question/question.module.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import usePrevious from '../customHooks/usePrevious';
import { useDispatch, useSelector } from 'react-redux';
import { getExamById, updateExam } from '../../../features/exams/examSlice';
/* import cloneDeep from 'lodash/cloneDeep'; */

export default function QuestionList({ examP }) {

    const { user } = useSelector((state) => state.auth),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        location = useLocation(),
        params = useParams(),
        [exam, setExam] = useState(examP),
        [correctAnswers, setCorrectAnswer] = useState(0),
        [questions, setQuestions] = useState(exam.questions),
        [questionsLength, setQuestionsLength] = useState(),
        [examSubmitted, setExamSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getExamById(params.id))
            .then(data => setExam(data.payload));
    }, []);

    useEffect(() => {
        setQuestions(exam.questions);
        setQuestionsLength(exam.questions?.length);
    }, [exam]);

    /* custom hook that provides previous props using useRef */
    const prevProp = usePrevious({ examSubmitted });
    useEffect(() => {
        if (prevProp && examSubmitted) {
            console.log(`${correctAnswers} / ${questionsLength}`);
            navigate('result', { state: { correctAnswers: correctAnswers, totalQuestions: questionsLength, formSubmitted: examSubmitted } });
        }
    }, [examSubmitted]);

    const changeHandler = (question) => {
        let questionIndex = questions.findIndex(q => q.id === question.id);
        let newQuestions = [...questions];
        newQuestions[questionIndex] = question;
        setQuestions(newQuestions);
    }

    const removeHandler = (id) => {
        let filteredQuestions = [...questions.filter(q => q._id !== id)],
            examToUpdate = {...exam};
        examToUpdate.questions = filteredQuestions;
        setQuestions(filteredQuestions);
        dispatch(updateExam(examToUpdate));
    }

    const addQuestionHandler = (question) => {
        /* Question validation */
        if (question.title === '' || question.description === '' || question.answers.length !== 4 ||
            !question.answers.some(a => a.txt === question.correctAnswer) ||
            question.answers.length !== new Set(question.answers.map(a => a.txt)).size) return;

        const newQuestions = [...questions, question];
        setQuestions(newQuestions);
        let examToUpdate = {...exam};
        examToUpdate.questions = newQuestions;

        dispatch(updateExam(examToUpdate));
    }

    const onSubmit = () => {
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
            setExamSubmitted(true)
        }
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
    }

    const onEditQuestion = (exam, newQuestion) => {
        let qToUpdate = exam.questions.find(q => q.id == newQuestion.id);
        qToUpdate = newQuestion;
    }

    const editAndNavigate = (id) => {
       navigate(`edit-question/${id}`, { state: { onEdit: onEditQuestion } })
    }

    return (
        <>
            <div className={`row row-cols-md-1 m-3 g-3 ${user.role !== 'student' || examSubmitted ? style.submitted : null}`}>
                {questions ? questions.map((question, index) => <Question question={question} questionIndex={index} key={index}
                        onChange={changeHandler} onRemove={removeHandler} onEdit={editAndNavigate} isSubmitted={!!(user.role === 'manager' || user.role === 'teacher' ? style.submitted : null)} />) : null}
            </div>
            {user.role === 'manager' || user.role === 'teacher' ? <AddQuestion onAdd={addQuestionHandler}/> : (!examSubmitted ? <Success onClick={onSubmit} >Submit Exam ✅</Success> : '')}
            {examSubmitted && <Outlet key={location.pathname}/>}
        </>
    );
}
