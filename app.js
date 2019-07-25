let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')
let cors = require('cors')
let errorhandler = require('errorhandler')
// let graphqlHTTP = require('express-graphql');
// let graphqlSchema = require('./api/models/serviceSearch')

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


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Error Handler
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
// Route Middlewares
app.use('/user/signup', require('./user_api/signup/signup'));
app.use('/user/login', require('./user_api/login/login'));
app.use('/posts', require('./post_api/posts'));
/* app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  // rootValue: root,
  graphiql: true,
})); */

// Import Routes
// let logInRoute = require('./routes/login')

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`))