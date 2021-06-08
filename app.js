const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./models/sequilize');

const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const filmRouter = require('./routes/films');
const genreRouter = require('./routes/genre');
const { authenticateJWT } = require('./middlewares/auth');

const app = express();

// const buf = films.reduce((result, {genre_ids, ...film}) => {
//     const memo = result;
//     const id = uuid();
//     memo.films.push({...film, id });
//     memo.genres[id] = genre_ids;

//     return memo;
// }, {
//     films: [],
//     genres: {},
// });

// const genres = Object.keys(buf.genres).reduce((result, filmId) => {
//     const ids = buf.genres[filmId];
//     return result.concat(ids.map(id => [filmId, id]))
// }, [])

// console.log(JSON.stringify(buf.films))
// console.log(JSON.stringify(genres))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/films', authenticateJWT, filmRouter);
app.use('/genres', genreRouter);

module.exports = app;
