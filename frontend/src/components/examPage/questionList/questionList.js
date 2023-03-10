import React, { useState, useEffect } from 'react'
import AddQuestion from '../addEditQuestion/addQuestion';
import { PrimaryBtn, Success } from '../../button/button.stories';
import Question from '../question/question';
import style from '../question/question.module.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import usePrevious from '../customHooks/usePrevious';
import { useDispatch, useSelector } from 'react-redux';
import { getExamById } from '../../../features/exams/singleExamSlice';
import { updateExam } from '../../../features/exams/examSlice';
import ValidQuestion from '../addEditQuestion/questionValidation';
// import { SuccessBtn } from '../../chakraButton/chakraButton.stories';

export default function QuestionList({ examP, editMode }) {

    const { user } = useSelector((state) => state.auth),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        location = useLocation(),
        params = useParams(),
        [exam, setExam] = useState(examP),
        [correctAnswers, setCorrectAnswer] = useState(0),
        [questions, setQuestions] = useState(exam.questions),
        [questionsLength, setQuestionsLength] = useState(exam.questions.length),
        [examSubmitted, setExamSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getExamById(params.id))
            .then(data => setExam(data.payload));
    }, []);

    useEffect(() => {
        setQuestions(exam.questions);
        /* setQuestionsLength(exam.questions?.length); */
    }, [dispatch, exam/* , questions */]);

    /* custom hook that provides previous props using useRef */
    const prevProp = usePrevious({ examSubmitted });
    useEffect(() => {
        debugger
        if (prevProp && examSubmitted) {
            console.log(`${correctAnswers} / ${questionsLength}`);
            navigate('result', { state: { correctAnswers: correctAnswers, totalQuestions: questionsLength, formSubmitted: examSubmitted } });
        }
    }, [examSubmitted]);

    const changeHandler = (question) => {
        let questionIndex = questions.findIndex(q => q._id === question._id);
        let newQuestions = [...questions];
        newQuestions[questionIndex] = question;
        setQuestions(newQuestions);
    }

    const removeHandler = (id) => {
        let filteredQuestions = [...questions.filter(q => q._id !== id)],
            examToUpdate = {...exam};
        examToUpdate.questions = filteredQuestions;
        setQuestions(filteredQuestions);
        dispatch(updateExam(examToUpdate))
            .then(data => setQuestions(data.payload.questions));
    }

    const addQuestionHandler = (question, numOfAnswers) => {
        const filteredAnswers = question.answers.filter(a => a.txt !== '');
        question.answers = filteredAnswers;
        if (!ValidQuestion(question, numOfAnswers)) return;

        const newQuestions = [...questions, question];
        let examToUpdate = {...exam};
        examToUpdate.questions = newQuestions;

        dispatch(updateExam(examToUpdate))
            .then(data => setQuestions(data.payload.questions))
    }

    const onSubmit = () => {
        debugger
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
            setQuestionsLength(questions.length)
            setExamSubmitted(true);
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
            <div className={`row row-cols-md-1 m-3 g-3 ${(user.role !== 'student' && !editMode) || examSubmitted ? style.submitted : null}`}>
                {questions && questions.map((question, index) => <Question question={question} questionIndex={index} key={question._id} onChange={changeHandler} onRemove={removeHandler} onEdit={editAndNavigate} isSubmitted={!!((user.role === 'manager' || user.role === 'teacher') && style.submitted)} />)}
            </div>
            {user.role === 'manager' || user.role === 'teacher' ? (editMode && questions?.length > 0 ? <PrimaryBtn onClick={onSubmit} >Submit Exam ???</PrimaryBtn> : <AddQuestion onAdd={addQuestionHandler} />) : (!examSubmitted ? <PrimaryBtn onClick={onSubmit} >Submit Exam ???</PrimaryBtn> : '')}
            {examSubmitted && <Outlet key={location.pathname} />}
        </>
    );
}
