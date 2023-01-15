import express from 'express';
import cors from 'cors';
import exams from './api/exams/exams.route.js';
import users from './api/users/users.route.js';

const app = express(),
    port = 8080;

app.use(cors());
app.use(express.json()); /* server can accept json in the body of the request */
app.use('/api/v1/exams', exams);
app.use('/api/v1/users', users);

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

export default app;