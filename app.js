var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb+srv://joelfernandez:' + process.env.MONGO_ATLAS_PW + '@abundant-2iz3d.mongodb.net/test?retryWrites=true&w=majority',
  { promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useFindAndModify: false})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err))
mongoose.Promise = global.Promise;


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const productRoutes = require('./api/routes/products');
const serviceRoutes = require('./api/routes/services');
const orderRoutes = require('./api/routes/orders');
// const userRoutes = require('./api/routes/users');
const signupRoutes = require('./api/routes/signup');
const loginRoutes = require('./api/routes/login');
const cartRoutes = require('./api/routes/cart');
const blogRoutes = require('./api/routes/blogs');
const contactRoutes = require('./api/routes/contacts');



const morgan = require('morgan');
const bodyParser = require('body-parser');
var app = express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'abun',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000}
}));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Routes that should handle requests
app.use('/products', productRoutes);
app.use('/services', serviceRoutes);
app.use('/orders', orderRoutes);
// app.use('/users', userRoutes);
app.use('/user/signup', signupRoutes);
app.use('/user/login', loginRoutes);
app.use('/cart', cartRoutes);
app.use('/blogs', blogRoutes);
app.use('/contacts', contactRoutes);








// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};



  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;