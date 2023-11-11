const productsModel = require('../models/products');

// To list products
module.exports.list = async function(req, res, next) {
  try {
    let list = await productsModel.find({}); 
    res.json(list);
} catch (error) {
    console.log(error);
    next(error);
}
}

module.exports.listById = async function(req, res, next) {
  try {
    console.log(`/getp/${req.params.productID}`);
    const product = await productsModel.findById(req.params.productID);

    if (!product) {
        return res.status(404).send("product not found");
    }

    // Send the product data in the response
    res.json({
        success: true,
        message: "product found by ID",
        product: product
    });
} catch (error) {
    console.error("Error in search", error);
    res.status(500).send("Invalid search");
}

}

// To modify a product
module.exports.modify = async function(req, res, next) {
  try {
    console.log("/:userID/modify");

    // Check modifier is the owner of the product or not
    const modifyProduct = await productsModel.findById(req.params.productID);
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
    try {
      let newProduct = new productsModel(req.body);

      let result = await productsModel.create(newProduct);
      res.json(
          {
              success: true,
              message: "Product created sucessfully."
          }
      );
  } 
  catch (error) {
      console.error("Cannot create product", error);
      res.status(500).send("Invalid product create");
}
}

// To delete a product
module.exports.delete = async function(req, res, next) {
  try {
    console.log("/:userID/:productID/delete");

    // Ensure the user delete the item is the owner of the product
    const deleteProduct = await productsModel.findById(req.params.productID);
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
