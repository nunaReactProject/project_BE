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

module.exports = productController;
