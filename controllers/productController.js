const products = require("./../models/productModel");
const { currency } = require("../configs/currency");

exports.findProducts = async (req, res) => {
  try {
    let product = req.params.productId
      ? await products.findOne({ where: { productId: req.params.productId } })
      : await products.findAll();
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.createProduct = async (req, res) => {
  try {
    let body = {
      userId: req.user.userId,
      productName: req.body.productName,
      price: req.body.price,
      currency: currency[req.user.country],
    };
    console.log(body);
    const product = await products.create(body);
    console.log("created");
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await products.update(
      { ...req.body },
      {
        where: { productId: req.params.productId },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await products.destroy({ where: { productId: req.params.productId } });
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
