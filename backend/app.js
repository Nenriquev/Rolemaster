var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/rolemaster_db',{useNewUrlParser: true})
    .then(()=> console.log('Base de datos conectada'))
    .catch(err => console.error(err))



app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.listen(() =>{
  console.log('Servidor corriendo')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

module.exports = app;
