import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let exams;

export default class ExamsDAO {
  static async injectDB(conn) {
    if (exams) {
      return;
    }
    try {
        exams = await conn.db(process.env.EASYQUIZY_NS).collection("exams");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in examsDAO: ${e}`,
      )
    }
  }

  static async updateExam(exam) {
    try {
      const updateResponse = await exams.updateOne(
        { exam_id: exam.id },
        { $set: { title: exam.title, description: exam.description, releasedDate: exam.releasedDate, quesions: exam.quesions  } },
      )

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async getExams({
      filters = null,
      page = 0,
      examsPerPage = 20,
  } = {}) {
      let query
      if (filters) {
        if ("title" in filters) {
          query = { $text: { $search: filters["title"] } }
        } else if ("id" in filters) {
          query = { "id": { $eq: filters["id"] } }
        }
      }

      let cursor;

      try {
          cursor = await exams
              .find(query)
      } catch (e) {
          console.error(`Unable to issue find command, ${e}`)
          return { examsList: [], totalNumExams: 0 }
      }

      const displayCursor = cursor.limit(examsPerPage).skip(examsPerPage * page);

      try {
          const examsList = await displayCursor.toArray()
          const totalNumExams = await exams.countDocuments(query)

          return { examsList, totalNumExams }
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents, ${e}`,
          )
          return { examsList: [], totalNumExams: 0 }
      }
  }

  static async addExam(exam) {
    try {
      return await exams.insertOne(exam)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
}