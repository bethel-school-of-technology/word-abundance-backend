var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// app_ben
let dotenv = require('dotenv');
let cors = require('cors')
let errorhandler = require('errorhandler')

mongoose.connect('mongodb+srv://joelfernandez:' + process.env.MONGO_ATLAS_PW + '@abundant-2iz3d.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const serviceRoutes = require('./api/routes/services');
const serviceOrderRoutes = require('./api/routes/serviceorders');



const morgan = require('morgan');
const bodyParser = require('body-parser');
var app = express();

// app_ben
app.get('/', (req, res) => {
  res.send('We are on home');
});
// Enviroment Variables
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/uploads', express.static('uploads'));


app.use(morgan('dev'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// app_ben
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Routes that should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);
app.use('/serviceorders', serviceOrderRoutes);

// app_ben
app.use('/user/signup', require('./api/routes/signup'));
app.use('/user/login', require('./api/routes/login'));
app.use('/posts', require('./api/routes/posts'));




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // app_ ben Error Handler
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({ log: errorNotification }))

}
function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url
 
  notifier.notify({
    title: title,
    message: str
  })
}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
