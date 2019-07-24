let express = require('express');
let app = express();
// let graphqlHTTP = require('express-graphql');
/* let { buildSchema } = require('graphql'); */
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')
let cors = require('cors')
let errorhandler = require('errorhandler')
// let graphqlSchema = require('./api/models/serviceSearch')

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Enviroment Variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true},
  () => console.log('connected to db')
);


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
/* app.use('/users', require('./api/routes/users')) */
app.use('/user/signup', require('./api/routes/signup'));
app.use('/user/login', require('./api/routes/login'));
app.use('/posts', require('./api/routes/posts'));
/* app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  // rootValue: root,
  graphiql: true,
})); */

// Import Routes
// let logInRoute = require('./routes/login')

// Construct a schema, using GraphQL schema language
/* let schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 */

// The root provides a resolver function for each API endpoint
/* let root = {
  hello: () => {
    return 'Yahoo!';
  },
}; */

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`))