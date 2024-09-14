const bcrypt = require('bcryptjs');
const User = require('../User.Schema');

const userService = {};

// 회원가입
userService.createUser = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { userId, password, name } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ userId, password: hash, name });

    await newUser.save();

    req.statusCode = 200;
    req.data = newUser;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 회원 정보 조회
userService.getUserInfo = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { user } = req;

    req.statusCode = 200;
    req.data = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = userService;
