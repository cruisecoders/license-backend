const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./models/db');
const busboy = require('connect-busboy');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboy());

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "X-My-Custom-Header, X-Another-Custom-Header");
    next(); // make sure we go to the next routes and don't stop here
});


router.use('/license', require('./Controllers/controllers'));

app.use('/api',router);

module.exports = app;