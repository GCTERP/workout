require('dotenv').config({path: "./config.env"});
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');




// db connection
// const connectDB = require("./config/db");
// connectDB();
mongoose.connect(process.env.MONGO_URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });


const app = express();


app.use(express.json());
app.use(cors({
    credentials:true,
    // this means we are exchanging cookies
    origin:['http:localhost:3000']
}))

app.use(cookieParser())



// Server Connection
PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));
process.on("unhandledRejection", (err, promise) => {
    console.log(`logged Error: ${err}`);
    server.close(() => process.exit(1));
});


app.use('/api/auth', require('./routes/auth'));
// auth routes are used only authentication

// These private routes refers to all routes after login
app.use('/api/admin', require('./routes/admin'));
app.use('/api/student', require('./routes/student'));

