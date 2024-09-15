const express = require('express');
const userApi = require('../entitys/user/user.api.js');
const authApi = require('../entitys/auth/auth.api.js');
const productApi = require('../entitys/product/product.api.js');

const router = express.Router();

router.use('/user', userApi);
router.use('/auth', authApi);
router.use('/product', productApi);

module.exports = router;
