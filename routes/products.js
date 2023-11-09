const express = require('express');
const router = express.Router();
const basePath = "/myproducts";
const productsController = require('../controllers/products');


// Routes
router.get(basePath + '/', productsController.list);
router.get(basePath + '/create', productsController.create);
router.get(basePath + '/modify/:productID/', productsController.modify);
router.get(basePath + '/post/:productID', productsController.post);
router.get(basePath + '/expire/:productID', productsController.expire);
router.get(basePath + '/delete/:productID', productsController.delete);

module.exports = router;

