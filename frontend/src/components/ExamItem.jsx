import React from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { PrimaryBtn } from "./button/button.stories";
import { DeleteIcon } from "./Icon/icon.stories";

export default function ExamItem({ exam, deleteExam, ...rest }) {
    const navigate = useNavigate();

    return (
        <div {...rest} className="col card p-40">
            <h2 className="card-header">{exam.title}</h2>
            <div>{Moment(exam.releasedDate).toLocaleString("en-US")}</div>
            <div>{`Number of Q: ${exam.questions.length}`}</div>
            <p>{exam.description}</p>
            <div className="footer">
                <PrimaryBtn onClick={() => navigate(`${exam._id}`)}>
                    Quiz Me
                </PrimaryBtn>
                <DeleteIcon onClick={() => deleteExam(exam._id)}>❌</DeleteIcon>
            </div>
        </div>
    );
}
