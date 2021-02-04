const express = require('express');
const router = express.Router();

var userController = require('../controllers/users.controller');


router.get('/', userController.show);
router.post('/add', userController.save);
router.get('/select/:id', userController.edit);
router.get('/delete/:id', userController.delete);

module.exports = router;
