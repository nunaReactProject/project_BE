const express = require('express');
const userRepository = require('./user.repository');
const userController = require('./controller/user.controller');
const userService = require('./service/user.service');
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

module.exports = router;
