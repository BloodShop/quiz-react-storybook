import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import ExamsDAO from './dao/examsDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.EASYQUIZY_DB_URI,
    {
      /* poolSize: 50, */
      wtimeoutMS: 2500,
      /* native_parser:true */ }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
      await ExamsDAO.injectDB(client);
      /* await ReviewsDAO.injectDB(client) */
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    });