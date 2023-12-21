const express = require('express');
const { fetchCategory } = require('../controller/Category');
const { fetchBrands, createBrand } = require('../controller/Brand');
const { createUser,loginUser, checkUser } = require('../controller/Auth');
const passport = require('passport')


const router = express.Router();

router.post('/signup',createUser).
        post('/login',passport.authenticate('local'),loginUser)
        .get('/check',passport.authenticate('jwt'),checkUser)

exports.router = router;