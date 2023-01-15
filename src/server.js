const express = require('express'),
    cors = require('cors'),
    app = express(),
    port = 8080;

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.listen(port, () => console.log('API is running on http://localhost:8080/login'));