let express = require('express');
let app = express();

// Import Routes
let authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000 , () => console.log("Server Up and Running"))
