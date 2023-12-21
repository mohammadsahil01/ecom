const express = require('express');
const { fetchCategory } = require('../controller/Category');
const { fetchBrands, createBrand } = require('../controller/Brand');


const router = express.Router();

router.get('/',fetchBrands)
      .post('/',createBrand)

exports.router = router;