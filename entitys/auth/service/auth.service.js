const User = require('../../user/User.Schema');
const bcrypt = require('bcryptjs');

const authService = {};

// 기본 로그인
authService.loginWithBasic = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { user } = req;
    const token = await user.generateToken();

    req.statusCode = 200;
    req.token = token;
    req.data = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 로그아웃
authService.logout = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    req.statusCode = 200;
    req.data = 'success';
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = authService;
