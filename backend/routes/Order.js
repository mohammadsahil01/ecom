const express = require('express');
const { AddToCart, fetchCartbyUser, DeleteFromCart, updateCart } = require('../controller/Cart');
const { CreateOrder, fetchOrderbyUser } = require('../controller/Order');

const router = express.Router();

router.post('/',CreateOrder)
      .get('/own',fetchOrderbyUser)
      
      

exports.router = router;