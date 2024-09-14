const bcrypt = require('bcryptjs');
const User = require('./User.Schema');

const userRepository = {};

// 이메일 검증
userRepository.validId = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { originalUrl } = req;
    const { userId } = req.body;
    const user = await User.findOne({ userId });

    if (originalUrl.includes('login')) {
      if (!user) throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else if (!originalUrl.includes('login') && user) throw new Error('이미 가입된 이메일입니다.');

    req.user = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 회원 정보 조회
userRepository.getUserInfo = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { validTokenId } = req;

    const user = await User.findById(validTokenId);

    if (!user) throw new Error('회원 정보를 조회할 수 없습니다.');

    req.user = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = userRepository;
