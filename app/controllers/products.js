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
    let productID = req.params.productID;
    let updatedProduct = productsModel(req.body);
    updatedProduct._id = productID;

    let result = await productsModel.updateOne({ _id: productID }, updatedProduct);

    if (result.modifiedCount > 0) {
        res.json(
            {success: true,
            message: "Product updated sucessfully."
        });
    }
    // Express will catch this on its own.
    else {
         throw new Error('Product not updated. Are you sure it exists?')
        }

}
catch(error){
console.error("Error in update:", error);
res.status(500).send("Invalid update");
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
    const productID = req.params.productID;
    const result = await productsModel.deleteOne({ _id: productID });

    if (!result) {
        return res.status(404).send("User not found");
    }

    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
        res.json(
            {
                success: true,
                message: "product deleted"
            }
        );
      } else {
          return res.status(404).send("product not found");
      }
    } catch (error) {
        console.error("Error in delete:", error);
        res.status(500).send("Invalid delete");
    }
}
