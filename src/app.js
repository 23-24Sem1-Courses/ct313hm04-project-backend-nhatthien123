const express = require('express');
const cors = require('cors');

const app = express();
const comicsRouter = require('./routes/comics.router');
const {
resourceNotFound,
handleError
} = require('./controllers/errors.controller');
app.use(cors());
app.use(express.json());
app.use('/api/comics', comicsRouter);
app.use(resourceNotFound);//404-error
app.use(handleError);//error handling
app.get('/', (req, res)=> {
    res.json({ message: 'Welcome to reading comic list application.'});
});
app.use('/api/comics', comicsRouter);
module.exports = app;
