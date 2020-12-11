const createError = require('http-errors');

const products = require('../models/products.model');

module.exports = {
    findAllProducts: async () => {
        const findProducts = await products.find();
        return findProducts;
    },
    findProductById: async productId => {
        const findProduct = await products.findById(productId);
        if (!findProduct) {
            throw new createError(409, 'Product not found');
        }
        return findProduct;
    },
    findProductsByIds: async productIds => {
        const findProducts = await products.find({ '_id': { $in: productIds } });
        return findProducts;
    }
};
