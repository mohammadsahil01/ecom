const express = require('express');
const { AddToCart, fetchCartbyUser, DeleteFromCart, updateCart } = require('../controller/Cart');

const router = express.Router();

router.post('/',AddToCart)
      .get('/',fetchCartbyUser)
      .delete('/:id',DeleteFromCart)
      .patch('/:id',updateCart)
      

exports.router = router;