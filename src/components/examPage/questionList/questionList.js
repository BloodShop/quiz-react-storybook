import React, { useState, useEffect } from 'react'
import AddQuestion from '../addQuestion/addQuestion';
import { Secondary, Success } from '../button/button.stories';
import Question from '../question/question';
import style from '../question/question.module.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import usePrevious from '../customHooks/usePrevious';
import ExamService from '../../../services/exams.service';
/* import cloneDeep from 'lodash/cloneDeep'; */

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
    const auth = useAuth(),
        navigate = useNavigate(),
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
            navigate('result', { state: { correctAnswers: correctAnswers, totalQuestions: questionsLength } } );
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

    return (
        <>
            <div className={`row row-cols-md-1 m-3 g-3 ${auth.user ? style.submitted : null}`}>
                {questions.map((question, index) => <Question question={question} questionIndex={index} key={index}
                        onChange={changeHandler} onRemove={removeHandler} isSubmitted={!!(auth.user ? style.submitted : null)} />)}
            </div>
            {auth.user ? <AddQuestion onAdd={addQuestionHandler}/> : <Success onClick={onSubmit} >Submit Exam ✅</Success>}
            <Outlet />
        </>
    );
}
