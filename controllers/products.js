const product = require('../models/products');

// To add a new product
module.exports.create = async function(req, res, next) {
  console.log("/:userID/create");
  res.send("Create a new product");
}

// To list products
module.exports.list = async function(req, res, next) {
  console.log("/:userID/list");
  res.send("List all products");
}

// To modify a product
module.exports.modify = async function(req, res, next) {
  console.log("/:userID/modify");
  res.send("Modify a product");
}

// To post a product
module.exports.post = async function(req, res, next) {
  console.log("/:userID/:productID/post");
  res.send("Post a product");
}

// To expire a product
module.exports.expire = async function(req, res, next) {
  console.log("/:userID/:productID/expire");
  res.send("Expire a product");
}

// To delete a product
module.exports.delete = async function(req, res, next) {
  console.log("/:userID/:productID/delete");
  res.send("Delete a product");
}
