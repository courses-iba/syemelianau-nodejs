const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
const sess = {
    secret: 'shop',
    resave: false,
    saveUninitialized: true
};

const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');
const basketRoutes = require('./routes/basket');

app.set('view engine', 'pug');

app.use(express.static(process.cwd() + '/public'));

app.use(session(sess));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/basket', basketRoutes);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) =>
    res.status(err.status || 500).render('error', {
        title: 'Shop',
        index: '../',
        links: {
            'Products': '../products',
            'Basket': '../basket'
        },
        error: err
    }));

module.exports = app;
