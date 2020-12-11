const productsService = require('../services/products.service');
const { getProducts } = require('./session');

const calculate = (basket, prods) => {
    const products = Object.entries(basket).reduce((array, [id, value]) => {
        const product = prods.find(({ _id }) => _id.toString() === id);
        array.push({ ...product.toObject(), number: value });
        return array;
    }, []);
    const total = products.reduce((sum, product) => sum + product.cost * product.number, 0).toFixed(2);
    return { products, total };
};

const find = async (req, res, next) => {
    try {
        const sessProducts = getProducts(req.session);
        const findProducts = await productsService.findProductsByIds(Object.keys(sessProducts));
        res.status(200).render('list', calculate(sessProducts, findProducts));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    calculate,
    find
};
