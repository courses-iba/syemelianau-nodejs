require('dotenv').config();
require('./database');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const createError = require('http-errors');

const indexRoutes = require('./routes/index.route');
const productsRoutes = require('./routes/products.route');
const basketRoutes = require('./routes/basket.route');

const app = express();
const sess = {
    secret: process.env.SESS_SECRET || 'shop',
    resave: false,
    saveUninitialized: true
};

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(express.static(process.cwd() + '/src/public'));

app.use(session(sess));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.status(200).json({});
    } else {
        next();
    }
});

app.use('/', indexRoutes);
app.use('/', productsRoutes);
app.use('/', basketRoutes);

app.use((req, res, next) => next(createError(404)));

app.use((error, req, res, next) =>
    res.status(error.status || 500).render('error', {
        title: 'Shop',
        index: '../',
        links: {
            'Products': '../products',
            'Basket': '../basket'
        },
        error
    }));

module.exports = app;
