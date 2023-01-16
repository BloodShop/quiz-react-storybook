import ExamsDAO from "../../dao/examsDAO.js"

export default class ExamsController {
    static async apiPostExam(req, res, next) {
        try {
            const examId = req.body.id;
            const description = req.body.description;
            const title = req.body.title;
            const releasedDate = Date.now();
            const questions = [
                ...req.body.questions
            ]

            const newExam = {
                id: req.body.id,
                description: req.body.description,
                title: req.body.title,
                releasedDate: req.body.releasedDate,
                questions: req.body.questions
            }

            const ExamResponse = await ExamsDAO.addExam(newExam)
            res.json({ status: "success", examResponse: ExamResponse })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetExams(req, res, next) {
        const examsPerPage = req.query.examsPerPage ? parseInt(req.query.examsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.id) {
            filters.id = req.query.id;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { examsList, totalNumExams } = await ExamsDAO.getExams({
            filters,
            page,
            examsPerPage,
        })

        let response = {
        exams: examsList,
        page: page,
        filters: filters,
        entries_per_page: examsPerPage,
        total_results: totalNumExams,
        }
        res.json(response)
    }

    static async apiGetExamById(req, res, next) {
        try {
            let id = req.params.id || {},
                exam = await ExamsDAO.getExamByID(id)
        if (!exam) {
                res.status(404).json({ error: "Not found" });
                return;
        }
            res.json(exam)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPutExam(req, res, next) {
        try {
            const newExam = {
                id: req.body.id,
                description: req.body.description,
                title: req.body.title,
                releasedDate: req.body.releasedDate,
                questions: req.body.questions
            }

            const ExamResponse = await ExamsDAO.updateExam(newExam)
            res.json({ status: "success", examResponse: ExamResponse })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteExam(req, res, next) {
        try {
            const newExam = {
                id: req.body.id,
                description: req.body.description,
                title: req.body.title,
                releasedDate: req.body.releasedDate,
                questions: req.body.questions
            }

            const ExamResponse = await ExamsDAO.updateExam(newExam)
            res.json({ status: "success", examResponse: ExamResponse })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}