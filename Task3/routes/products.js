const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const PRODUCTS = require('../mock-data');

router.get('/', (req, res) => {
    res.status(200).render('products', {
        title: 'Shop',
        index: '../',
        links: {
            'Products': '',
            'Basket': '../basket'
        },
        products: PRODUCTS
    });
});

router.post('/', (req, res, next) => {
    const body = JSON.parse(req.body);
    if (body.id && body.number) {
        const product = PRODUCTS.find(p => p.id === body.id);
        if (product) {
            if (req.session.products) {
                req.session.products[body.id] = req.session.products[body.id]
                    ? req.session.products[body.id] + body.number
                    : body.number;
            } else {
                req.session.products = { [body.id]: body.number };
            }
            res.status(200).send(`${body.number} ${product.name} added to basket.`).end();
            return;
        }
    }
    next(createError(400));
});

module.exports = router;
