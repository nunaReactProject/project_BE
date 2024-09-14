const express = require('express');
const authRepository = require('../auth/auth.repository');
const intercepter = require('../../common/http-exception.filter');
const productController = require('./controller/product.controller');
const productService = require('./service/product.service');

const router = express.Router();

router.post('/', intercepter);

module.exports = router;
