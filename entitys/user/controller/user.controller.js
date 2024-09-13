const bcrypt = require('bcryptjs');
const User = require('../User.Schema');

const userController = {};

// 회원가입
userController.createUser = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = userController;
