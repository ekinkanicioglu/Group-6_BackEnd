const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');


// Routes
<<<<<<< Updated upstream

router.get('/', productsController.list);
router.get('/getp/:productID', productsController.listById);

router.put('/modify/:productID', authController.requireLogin, productsController.hasAuthorization,productsController.modify);

router.post('/create', 
authController.requireLogin,
 productsController.create);

router.delete('/deletep/:productID', authController.requireLogin, usersController.isAdmin, productsController.delete);

=======
router.get(basePath, productsController.list);
router.get(basePath + '/getp/:productID', productsController.listById);
router.put(basePath + '/putp/:productID/', productsController.modify);
router.post(basePath + '/postp', productsController.post);
router.delete(basePath + '/deletep/:productID', productsController.delete);
>>>>>>> Stashed changes

module.exports = router;

