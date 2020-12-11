const express = require('express');

const basketController = require('../controllers/basket.controller');

const router = express.Router();

const path = '/basket';

router.get(`${path}`, basketController.get);
router.delete(`${path}/:id`, basketController.remove);
router.put(`${path}/:id`, basketController.decrease);
router.delete(`${path}`, basketController.clear);

module.exports = router;
