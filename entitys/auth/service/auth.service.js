const User = require('../../user/User.Schema');
const bcrypt = require('bcryptjs');

const authService = {};

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

module.exports = authService;
