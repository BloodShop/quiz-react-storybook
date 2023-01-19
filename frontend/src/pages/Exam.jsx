import React, { useEffect, useState } from "react";
import QuestionList from "../components/examPage/questionList/questionList";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById, reset } from "../features/exams/examSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { PrimaryBtn } from "../components/button/button.stories";

export default function Exam() {
    const params = useParams(),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        { user } = useSelector((state) => state.auth),
        [editMode, setEditExam] = useState(false),
        { exam, isLoading, message, isError } = useSelector(
            (state) => state.exams
        );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        } else if (user.role === "teacher" || user.role === "manager") {
            setEditExam(true);
        }

        dispatch(getExamById(params.id));

        return () => {
            dispatch(reset());
        };
    }, [user, dispatch, message, isError]);

    if (!exam) {
        return <Spinner />;
    }

    return (
        <>
            <div className="App">
                {exam && (
                    <>
                        <header>
                            <h1>{exam.title}</h1>
                        </header>
                        {user.role === "manager" || user.role === "teacher" ? (
                            <PrimaryBtn
                                onClick={() => {
                                    setEditExam(!editMode);
                                }}
                            >
                                {editMode ? "editMode" : "quizMode"}
                            </PrimaryBtn>
                        ) : (
                            ""
                        )}
                        <QuestionList examP={exam} editMode={editMode} />
                    </>
                )}
            </div>
        </>
    );
}
