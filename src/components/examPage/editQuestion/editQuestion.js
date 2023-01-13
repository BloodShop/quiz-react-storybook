import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ExamService from '../../../services/exams.service';

export default function EditQuestion() {

    const service = new ExamService(),
        params = useParams(),
        [exam, setExam] = useState(),
        [question, setQuestion] = useState();

    useEffect(() => {
        service.getExamById(params.id)
            .then(res => setExam(res))
            .then(() => {
                setQuestion(exam.questions?.find(q => q.id == params.id)); /* equallity by type && value */
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {question && <div>EditQuestion</div>}
        </>
    );
}
