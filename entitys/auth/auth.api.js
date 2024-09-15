const express = require('express');
const userRepository = require('../user/user.repository');
const authController = require('./controller/auth.controller');
const authService = require('./service/auth.service');
const intercepter = require('../../common/http-exception.filter');
const router = express.Router();

// 일반 로그인
router.post(
  '/basiclogin',
  userRepository.validId,
  authController.loginWithBasic,
  authService.loginWithBasic,
  intercepter
);

// 로그아웃
router.post('/logout', authController.logout, authService.logout, intercepter);

module.exports = router;
