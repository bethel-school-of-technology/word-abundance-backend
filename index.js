/* let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')
let cors = require('cors')

app.get('/', (req, res) => {
    res.send('We are on home');
});

// Import Routes
let signUpRoute = require('./routes/signUp');
let logInRoute = require('./routes/login')
let postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    {useNewUrlParser: true},
    () => console.log('connected to db')
);

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route Middlewares
app.use('/api/user/signup', signUpRoute);
app.use('/api/user/login', logInRoute);
app.use('/posts', postRoute);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`)) */