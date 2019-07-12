let express = require('express');
let app = express();
let mongoose = require('mongoose');

// Connect to DB
mongoose.connect(
    'mongodb+srv://teamadmin:Password12@cluster0-mkdit.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }, 
    () => console.log('connected to db')
);

// Import Routes
let authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server Up and Running"))
