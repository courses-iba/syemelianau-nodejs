const productService = require('../services/products.service');
const {
    getProducts,
    deleteProduct,
    decreaseProduct,
    deleteProducts
} = require('../utils/session');
const { calculate, find } = require('../utils/util');

module.exports = {
    get: async (req, res, next) => {
        try {
            const sessProducts = getProducts(req.session);
            const findProducts = await productService.findProductsByIds(Object.keys(sessProducts));
            const { products, total } = calculate(sessProducts, findProducts);
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
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        deleteProduct(req.session, req.params.id);
        await find(req, res, next);
    },
    decrease: async (req, res, next) => {
        decreaseProduct(req.session, req.params.id);
        await find(req, res, next);
    },
    clear: async (req, res) => {
        deleteProducts(req.session);
        res.status(200).render('list', { products: [], total: 0 });
    }
};
