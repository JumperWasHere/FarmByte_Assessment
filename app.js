var createError = require('http-errors');
var express = require('express');
var app = express();
const cors = require('cors');
var path = require('path');
var userRouter = require('./routes/user.router');
const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + '/.env' });

const uri = process.env.CONNECTION_STRING;

mongoose.connect(uri)
    .catch((err) => console.log(err));
app.use(cors({
    origin: '*'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
// app.use(express.urlencoded());
app.use('/users', userRouter)
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;