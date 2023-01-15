import express from 'express';
import cors from 'cors';
import exams from './api/exams/exams.route.js';
import users from './api/users/users.route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express(),
    port = 8080;

app.use(cors());
app.use(express.json()); /* server can accept json in the body of the request */

mongoose.set('strictQuery', false);

mongoose.connect(process.env.EASYQUIZY_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Connected to Database"))
    .catch(error => console.error(error));

/* const examRouter = require('./routes/exams');
const userRouter = require('./routes/users'); */
app.use('/api/v1/exams', exams);
app.use('/api/v1/users', users);

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

export default app;