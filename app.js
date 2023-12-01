var express = require('express');
var app = express();
const cors = require('cors');
var path = require('path');
var userRouter = require('./routes/user.router');
const mongoose = require("mongoose");
const uri = "mongodb+srv://FarmByte:VWidata3AWANCI6a@atlascluster.jgifr0r.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => {
        // app.listen(5000,()=>console.log("listend to port 5000 mongo db"))
    }).catch((err) => console.log(err));
app.use(cors({
    origin: '*'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
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