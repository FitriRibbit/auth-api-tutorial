const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//setup to read on env variable from a file
dotenv.config();

//Connect to database
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true }).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("not connected", err);
});

// Middleware
app.use(express.json());
// Route middleware

app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Server is running...'));