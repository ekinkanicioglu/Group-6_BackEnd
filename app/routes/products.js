const express = require('express');
const router = express.Router();
const basePath = "/myproducts";
const productsController = require('../controllers/products');


// Routes
router.get(basePath + '/getp', productsController.list);
router.get(basePath + '/getp/:productID', productsController.listById);
router.put(basePath + '/putp/:productID/', productsController.modify);
router.post(basePath + '/postp', productsController.post);
router.delete(basePath + '/deletep/:productID', productsController.delete);

module.exports = router;

