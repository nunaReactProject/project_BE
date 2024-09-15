const express = require('express');
const userRepository = require('./user.repository');
const userController = require('./controller/user.controller');
const userService = require('./service/user.service');
const authRepository = require('../auth/auth.repository');
const intercepter = require('../../common/http-exception.filter');

const router = express.Router();

// 회원가입
router.post(
  '/',
  userRepository.validId,
  userController.createUser,
  userService.createUser,
  intercepter
);

// 회원 정보 조회
router.get(
  '/',
  authRepository.authenticate,
  userRepository.getUserInfo,
  userService.getUserInfo,
  intercepter
);

module.exports = router;
