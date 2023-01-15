import ExamsDAO from "../../dao/examsDAO.js"

export default class ExamsController {
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

  /* static async apiGetExamCuisines(req, res, next) {
    try {
      let cuisines = await ExamsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  } */
}