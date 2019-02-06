require("dotenv").config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

//CORS ERRORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    }
    next();
})

// Require Routes
const companyRoutes = require('./routes/company');
const adminRoutes = require('./routes/admin');
const superAdminRoutes = require('./routes/superAdmin');

//Connecting to the local database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Wrightway', { useNewUrlParser: true }); 

// Connection to mlab
mongoose.connect('mongodb://wrightway:wrightway54@ds035633.mlab.com:35633/wrightway', { useNewUrlParser: true })

//Middleware
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "client", "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.get('/', function(req, res) {
    res.json({message: 'This is my backend!'});
})

app.get('/users', function(req, res) {
    res.json([
        {name: 'Matthew', age: 12, course: 'EEE'},
        {name: 'Bayo', age: 12, course: 'EEE'},
        {name: 'Jude', age: 12, course: 'EEE'},
        {name: 'Kelvin', age: 12, course: 'EEE'}
    ])
})

// Using routes
app.use('/company', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/superAdmin', superAdminRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;