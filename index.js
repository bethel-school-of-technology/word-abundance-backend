let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('We are on home');
});

// Import Routes
let authRoute = require('./routes/auth');
let postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    {useNewUrlParser: true},
    () => console.log('connected to db')
);

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))