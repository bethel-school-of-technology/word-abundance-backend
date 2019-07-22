let express = require('express');
let app = express();
let graphqlHTTP = require('express-graphql');
/* let { buildSchema } = require('graphql'); */
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')
let cors = require('cors')
let graphqlSchema = require('./models/launch')

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Import Routes
let signUpRoute = require('./routes/signUp');
let logInRoute = require('./routes/login')
let postRoute = require('./routes/posts');
/* let usersRoute = require('./routes/users'); */

// Construct a schema, using GraphQL schema language
/* let schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 */

// Enviroment Variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
  },
  () => console.log('connected to db')
);

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route Middlewares
/* app.use('/users', usersRoute) */
app.use('/api/user/signup', signUpRoute);
app.use('/api/user/login', logInRoute);
app.use('/posts', postRoute);
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  // rootValue: root,
  graphiql: true,
}));

// The root provides a resolver function for each API endpoint
/* let root = {
  hello: () => {
    return 'Yahoo!';
  },
}; */

/* app.listen(3001);
console.log('Running a GraphQL API server at localhost:4000/graphql'); */

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`))