let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('We are on home');
});

// Import Routes
let authRoute = require('./routes/auth');

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

app.listen(3001, () => console.log("Server Up and Running"))