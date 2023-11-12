const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');


// Routes
router.get('/getp', productsController.list);
router.get('/getp/:productID', productsController.listById);
router.put('/putp/:productID/', productsController.modify);
router.post('/postp', productsController.post);
router.delete('/deletep/:productID', productsController.delete);

module.exports = router;

