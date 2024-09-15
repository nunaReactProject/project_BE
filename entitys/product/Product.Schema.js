const mongoose = require('mongoose');
const User = require('../user/User.Schema');

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User, required: true },
    productId: { type: String },
    title: { type: String },
    date: { type: String },
    time: { type: String },
    running: { type: String },
    location: { type: String },
    poster: { type: String },
  },

  { timeStamp: true }
);

productSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};

const Product = mongoose.model('nunaProduct', productSchema);

module.exports = Product;
