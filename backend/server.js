const express = require('express');
const app = express();
// const allRouters = require('./routes/allRouters');
const allRouters = require('./routes/allRouters'); // Ensure the folder and file casing matches exactly as on disk
const userSchema = require('./models/userSchema');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const mongodbConnect = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');


dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Adjust as needed
    credentials: true, // Allow cookies to be sent
}));

// MongoDB connection
mongodbConnect();

// accessing router
app.use('/',allRouters)

// default error handler
const errorHandler = (err, _req, res, next)=>{
    if(res.headersSent){
        return next(err);
    }
    res.json({
        status: "error",
        message: err.message || "Internal Server Error",
        error: err,
    });
}
app.use(errorHandler);

// start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

