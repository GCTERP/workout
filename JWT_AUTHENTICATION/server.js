require('dotenv').config({path: "./config.env"});
const express = require('express');




// db connection
const connectDB = require("./config/db");
connectDB();


const app = express();


app.use(express.json());



// Server Connection
PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));
process.on("unhandledRejection", (err, promise) => {
    console.log(`logged Error: ${err}`);
    server.close(() => process.exit(1));
});


app.use('/auth', require('./routes/auth'));
// auth routes are used only authentication
app.use('/', require('./routes/private'));
// These private routes refers to all routes after login
