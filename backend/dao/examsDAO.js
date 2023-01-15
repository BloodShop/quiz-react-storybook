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
        console.log(exams);
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in examsDAO: ${e}`,
      )
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
      } /* else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      } */
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

/*
static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  } */
}