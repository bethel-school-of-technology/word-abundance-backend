const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Enviroment Variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
  { promiseLibrary: require('bluebird'), 
    useNewUrlParser: true, 
    useFindAndModify: false})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'LightBlog', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

const loginRoutes = require('./api/routes/login');
// const orderRoutes = require('./api/routes/orders');
const blogRoutes = require('./api/routes/blogs');
const productRoutes = require('./api/routes/products');
// const serviceRoutes = require('./api/routes/services');
// const serviceOrderRoutes = require('./api/routes/orders');
const signUpRoutes = require('./api/routes/signup');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes that should handle requests
app.use('/blogs', blogRoutes);
// app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
// app.use('/services', serviceRoutes);
// app.use('/serviceorders', serviceOrderRoutes);
// app.use('/uploads', express.static('uploads'));
app.use('/user/signup', signUpRoutes );
app.use('/user/login', loginRoutes);

module.exports = app;