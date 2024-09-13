const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Schema = mongoose.Schema;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
  return token;
};

const User = mongoose.model('nunaUser', userSchema);

module.exports = User;
