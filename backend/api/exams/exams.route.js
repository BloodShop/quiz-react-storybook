import express from 'express';
import ExamsCtrl from './exams.controller.js';

const router = express.Router();

router
    .route('/')
    .get(ExamsCtrl.apiGetExams)
    .post(ExamsCtrl.apiPostExam);

router
    .route('/:id')
    .put(ExamsCtrl.apiPutExam)
    .delete(ExamsCtrl.apiDeleteExam);

export default router;