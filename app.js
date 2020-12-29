const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const URL = 'mongodb://localhost/ChatSystem';
const mongoDB = require('./helper/db');
// mongoDB(URL);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/', (req, res) => {res.sendFile(__dirname + '/sheets/html/homePage.html');});

app.use('/js/homePage', express.static(path.join(__dirname, '/sheets/js/homePage.js')));
app.use('/css/homePage', express.static(path.join(__dirname, '/sheets/css/homePage.css')));

app.use('/js/chai', express.static(path.join(__dirname, '/node_modules/chai/chai.js')));
app.use('/js/chai-http', express.static(path.join(__dirname, '/node_modules/chai-http/dist/chai-http.js')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Not found');
});

module.exports = app;
