const express= require('express');
const auth= require('../middleware/auth');
const {addUser} = require('../controllers/userControllers');

const router= express.Router();

router.post('/register',  addUser);

module.exports={
    routes: router
}