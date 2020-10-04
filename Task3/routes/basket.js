const express = require('express');
const router = express.Router();

const PRODUCTS = require('../mock-data');

router.get('/', (req, res) => {
    const { products, total } = calculate(req.session.products);
    res.status(200).render('basket', {
        title: 'Shop',
        index: '../',
        links: {
            'Products': '../products',
            'Basket': ''
        },
        products,
        total
    });
});

router.delete('/:id', (req, res) => {
    delete req.session.products[req.params.id];
    res.status(200).render('list', calculate(req.session.products));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (req.session.products[id] !== 1) {
        --req.session.products[id];
    } else {
        delete req.session.products[id];
    }
    res.status(200).render('list', calculate(req.session.products));
});

router.delete('/', (req, res) => {
    delete req.session.products;
    res.status(200).render('list', calculate(req.session.products));
});

const calculate = prods => {
    const products = Object.entries(prods || {}).reduce((array, [id, value]) => {
        array.push(PRODUCTS.find(p => p.id === id));
        array[array.length - 1].number = value;
        return array;
    }, []);
    const total = products.reduce((sum, product) => sum + product.cost * product.number, 0).toFixed(2);
    return { products, total };
};

module.exports = router;
