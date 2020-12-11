const express = require('express');

const productsController = require('../controllers/products.controller');

const router = express.Router();

const path = '/products';

router.get(`${path}`, productsController.get);
router.post(`${path}`, productsController.add);

module.exports = router;
