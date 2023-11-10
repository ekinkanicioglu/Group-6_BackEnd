const Productmodel = require('../models/products');

// To list products
module.exports.list = async function(req, res, next) {
  console.log("/:userID/list");
  res.send("List all products");
}

module.exports.listById = async function(req, res, next) {
  try{
    console.log("/:userID/listId");
    const productbyID = await Productmodel.findById(req.params.productID);
    if (!productbyID) {
      return res.status(404).send("Product not found");
    }
    res.send("List products by ID");
  }
  catch (error){
    console.error("error in seach", error);
    res.status(500).send("Invalid search");
  }

}

// To modify a product
module.exports.modify = async function(req, res, next) {
  try {
    console.log("/:userID/modify");

    // Check modifier is the owner of the product or not
    const modifyProduct = await Productmodel.findById(req.params.productID);
    if (!modifyProduct) {
      return res.status(404).send("Product not found");
    }

    if (modifyProduct.owner.toString() !== req.params.userID) {
      return res.status(403).send("Permission denied. You are not the owner of this product.");
    }

    // Logic to modify a product
    res.send("Modify a product");
  } catch (error) {
    console.error("Error in modify:", error);
    res.status(500).send("Invalid modification");
  }
}

// To add a product
module.exports.post = async function(req, res, next) {
  console.log("/:userID/:productID/post");
  res.send("Added a product");
}

// To delete a product
module.exports.delete = async function(req, res, next) {
  try {
    console.log("/:userID/:productID/delete");

    // Ensure the user delete the item is the owner of the product
    const deleteProduct = await Productmodel.findById(req.params.productID);
    if (!deleteProduct) {
      return res.status(404).send("Product not found");
    }

    if (deleteProduct.owner.toString() !== req.params.userID) {
      return res.status(403).send("Permission denied. You are not the owner of this product.");
    }

    // Logic to delete a product
    res.send("Delete a product");
  } catch (error) {
    console.error("Error in delete:", error);
    res.status(500).send("Invalid delete");
  }
}
