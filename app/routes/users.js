const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/getu', userController.list);
router.get('/getu/:userID', userController.userByID);
router.put('/putu/:userID',userController.update);
router.post('/postu',userController.create);
router.delete('/deleteu/:userID',userController.remove);

module.exports = router;

