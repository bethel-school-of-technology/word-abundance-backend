let express = require('express');
let app = express();
let dotenv = require('dotenv');
let mongoose = require('mongoose');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, 
    () => console.log('connected to db')
);

// Import Routes
let authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server Up and Running"))
