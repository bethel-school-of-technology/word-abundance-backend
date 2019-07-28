const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// let graphqlHTTP = require('express-graphql');
// let graphqlSchema = require('./api/models/serviceSearch')

let app = express();

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Enviroment Variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
  { promiseLibrary: require('bluebird'), 
    useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  mongoose.Promise = global.Promise;

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const serviceRoutes = require('./api/routes/services');
const serviceOrderRoutes = require('./api/routes/orders');
const signUpRoutes = require('./api/routes/signup');
const loginRoutes = require('./api/routes/login');
const postRoutes = require('./api/routes/posts');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(morgan('dev'));
app.use(logger('dev'));


// Routes that should handle requests

/* app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: global,
  graphiql: true,
})); */

app.use('/orders', orderRoutes);
app.use('/posts', postRoutes);
app.use('/products', productRoutes);
app.use('/services', serviceRoutes);
app.use('/serviceorders', serviceOrderRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/user/signup', signUpRoutes );
app.use('/user/login', loginRoutes);


module.exports = app;