const isEmpty = session => !session.products;

const getProducts = session => session.products || {};
const deleteProducts = session => delete session.products;

const deleteProduct = (session, id) => delete session.products[id];

const decreaseProduct = (session, id) => {
    session.products[id] !== 1
        ? --session.products[id]
        : delete session.products[id];
};

const updateProduct = (session, product) => {
    if (isEmpty(session)) {
        session.products = { [product.id]: product.number };
    } else {
        session.products[product.id] = session.products[product.id]
            ? session.products[product.id] + product.number
            : product.number;
    }
};

module.exports = {
    isEmpty,
    getProducts,
    deleteProducts,
    deleteProduct,
    decreaseProduct,
    updateProduct
};
