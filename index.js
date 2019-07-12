let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');

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

app.listen(6000, () => console.log("Server Up and Running"))