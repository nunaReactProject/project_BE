const Product = require('../Product.Schema');
const randomStringGenerator = require('../../../util/randomStringGenerator');
const productController = {};

productController.createOrder = async (req, res, next) => {
  try {
    const { id, title, date, time, running, location, poster } = req.body;
    const { validTokenId } = req;

    const newOrder = new Product({
      userId: validTokenId,
      productId: id,
      title,
      date,
      time,
      running,
      location,
      poster,
      orderNum: randomStringGenerator(),
    });

    await newOrder.save();

    req.statusCode = 200;
    req.data = newOrder;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

productController.getProductsByUser = async (req, res, next) => {
  try {
    const { validTokenId } = req;

    const products = await Product.find({ userId: validTokenId });

    req.statusCode = 200;
    req.data = products;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

productController.deleteProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { validTokenId } = req;

    const result = await Product.deleteOne({ _id: _id, userId: validTokenId });

    if (result.deletedCount === 0) {
      throw new Error('상품을 찾을 수 없습니다.');
    }

    req.statusCode = 200;
    req.data = '상품이 성공적으로 삭제되었습니다.';
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = productController;

module.exports = productController;
