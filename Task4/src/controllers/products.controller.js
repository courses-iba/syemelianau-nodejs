const createError = require('http-errors');

const productService = require('../services/products.service');
const { updateProduct } = require('../utils/session');

module.exports = {
    get: async (req, res, next) => {
        try {
            const products = await productService.findAllProducts();
            res.status(200).render('products', {
                title: 'Shop',
                index: '../',
                links: {
                    'Products': '',
                    'Basket': '../basket'
                },
                products
            });
        } catch (error) {
            next(error);
        }
    },
    add: async (req, res, next) => {
        const product = JSON.parse(req.body);
        if (product.id && product.number) {
            try {
                const findProduct = await productService.findProductById(product.id);
                updateProduct(req.session, product);
                res.status(200).send(`${product.number} ${findProduct['name']} added to basket.`).end();
            } catch (error) {
                next(error);
            }
        } else {
            next(createError(400));
        }
    }
};
