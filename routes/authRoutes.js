const express=require('express');
const { signupHandler, signinHandler } = require('../controllers/userAuth');
const authRoute=express.Router();

authRoute.post('/signup', signupHandler);
authRoute.post('/signin', signinHandler);

module.exports = authRoute;