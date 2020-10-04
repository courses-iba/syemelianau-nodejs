const images = 'images/products/';
const exp = '.jpg';

const PRODUCTS = [
    {
        id: '1',
        name: 'Bread',
        cost: 1.05,
        img: `${images}bread${exp}`
    }, {
        id: '2',
        name: 'Milk',
        cost: 2.59,
        img: `${images}milk${exp}`
    }, {
        id: '3',
        name: 'Sour cream',
        cost: 1.95,
        img: `${images}sour_cream${exp}`
    }, {
        id: '4',
        name: 'Eggs',
        cost: 1.99,
        img: `${images}eggs${exp}`
    }, {
        id: '5',
        name: 'Pasta',
        cost: 1.55,
        img: `${images}pasta${exp}`
    }, {
        id: '6',
        name: 'Potatoes',
        cost: 3.49,
        img: `${images}potatoes${exp}`
    }
];

module.exports = PRODUCTS;
