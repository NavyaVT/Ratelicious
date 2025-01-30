var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const swaggerUi = require('swagger-ui-express')
const swaggerJsDocs = require('swagger-jsdoc')
const createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var hotelRouter = require("./routes/hotel")
var pictureRouter = require("./routes/picture")
var reviewRouter = require("./routes/review")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/hotel", hotelRouter)
app.use("/picture", pictureRouter)
app.use("/review",reviewRouter)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ratelicious',
      version: '1.0.0',
      description: 'A cafe and restaurant rating web-app backend with swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
  res.render('error');
});

module.exports = app;
