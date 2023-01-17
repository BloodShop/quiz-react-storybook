import React, { useState, useEffect } from 'react'
import AddQuestion from '../addQuestion/addQuestion';
import { Success } from '../button/button.stories';
import Question from '../question/question';
import style from '../question/question.module.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import usePrevious from '../customHooks/usePrevious';
import ExamService from '../../../services/exams.service';
import { useDispatch, useSelector } from 'react-redux';
/* import cloneDeep from 'lodash/cloneDeep'; */

export default function QuestionList({ questionsP }) {

    const dispatch = useDispatch(),
        { user } = useSelector((state) => state.auth),
        { isLoading, isError, message } = useSelector((state) => state.exams);

    const auth = useAuth(),
        navigate = useNavigate(),
        location = useLocation(),
        [correctAnswers, setCorrectAnswer] = useState(0),
        [questions, setQuestions] = useState(questionsP),
        [questionsLength, setQuestionsLength] = useState(),
        [examSubmitted, setExamSubmitted] = useState(false);
    useEffect(() => {
        setQuestionsLength(questions.length);
    }, [questions])

    const service = new ExamService(),
        params = useParams(),
        [exam, setExam] = useState();
    useEffect(() => {
        service.getExamById(params.id)
                .then(res => setExam(res))
                .catch(err => console.log(err));;
    }, [])

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
        let filteredQuestions = [...questions.filter(q => q.id !== id)],
            toUpdateExam = {...exam};
        toUpdateExam.questions = filteredQuestions;
        setQuestions(filteredQuestions);
        service.putExam(toUpdateExam);
    }

    const addQuestionHandler = (question) => {
        /* Question validation */
        if (question.title === '' || question.description === '' || question.answers.length !== 4 ||
            !question.answers.some(a => a.txt === question.correctAnswer) ||
            question.answers.length !== new Set(question.answers.map(a => a.txt)).size) return;

        const newQuestion = {id: Math.round(Math.random() * 100000) ,...question},
            newQuestions = [...questions, newQuestion];

        setQuestions(newQuestions);
        let examToUpdate = {...exam};
        examToUpdate.questions.push({ id: Math.round(Math.random() * 100000) ,...newQuestion });
        service.putExam(examToUpdate)
            .then(res => {
                console.log(examToUpdate);
                setExam(examToUpdate);
            });
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
        service.putExam(exam)
            .then((res) => console.log(res));
    }

    const editAndNavigate = (questionId) => {
       navigate(`edit-question/${questionId}`, { state: { onEdit: onEditQuestion } })
    }

    return (
        <>
            <div className={`row row-cols-md-1 m-3 g-3 ${auth.user || examSubmitted ? style.submitted : null}`}>
                {questions.map((question, index) => <Question question={question} questionIndex={index} key={index}
                        onChange={changeHandler} onRemove={removeHandler} onEdit={editAndNavigate} isSubmitted={!!(user.role === 'manager' || user.role === 'teacher' ? style.submitted : null)} />)}
            </div>
            {user.role === 'manager' || user.role === 'teacher' ? <AddQuestion onAdd={addQuestionHandler}/> : (!examSubmitted ?<Success onClick={onSubmit} >Submit Exam ✅</Success> : '')}
            {examSubmitted && <Outlet key={location.pathname}/>}
        </>
    );
}