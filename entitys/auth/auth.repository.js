const jwt = require('jsonwebtoken');
const User = require('../user/User.Schema');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authRepository = {};

module.exports = authRepository;
