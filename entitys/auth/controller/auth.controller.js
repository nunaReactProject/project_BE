const User = require('../../user/User.Schema');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const axios = require('axios');
const qs = require('qs');
dotenv.config();

const authController = {};

// 기본 로그인
authController.loginWithBasic = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { user } = req;
    const { password } = req.body;

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 로그아웃
authController.logout = async (req, res, next) => {
  try {
    const token = req.cookies['token'];

    if (!token) throw new Error('로그인 상태가 아닙니다.');
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = authController;
