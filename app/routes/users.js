const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authController = require('../controllers/auth');

router.get('/list', userController.list);
router.get('/getu/:userID', userController.userByID);
router.put('/edit/:userID',userController.update);
router.post('/signup',userController.create);
router.delete('/delete/:userID',userController.remove);
router.post('/login', authController.signIn);

router.get('/signup',userController.signup_get);
router.get('/login', userController.signIn_get);


module.exports = router;

