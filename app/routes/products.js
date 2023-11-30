const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');


// Routes

router.get('/', productsController.list);
router.get('/getp/:productID', productsController.listById);

router.put('/modify/:productID', authController.requireLogin, productsController.hasAuthorization,productsController.modify);

router.post('/create', 
authController.requireLogin,
 productsController.create);

router.delete('/deletep/:productID', authController.requireLogin, usersController.isAdmin, productsController.delete);


module.exports = router;

