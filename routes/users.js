const express = require('express');
const router = express.Router();

var userController = require('../controllers/users.controller');

router.get('/', (req,res)=> {
    console.log('Get request');    
})

router.get('/', userController.show);
router.get('/select/;id', userController.edit);
router.post('/add', userController.save);
router.get('/delete/:id', userController.delete);

module.exports = router;
