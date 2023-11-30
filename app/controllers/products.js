const productsModel = require('../models/products');
let authController = require('../controllers/auth');


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


        // Check if the seller is provided
        if (!req.body.seller || req.body.seller.trim() === "") {
            throw new Error('login is required.');
        }

        const product = await productsModel.findById(productID);

        if (!product) {
            throw new Error('Product not found. Are you sure it exists?');
            }
        
        if (product.owner.toString() !== req.auth.id) {
            throw new Error('Permission denied. You are not the owner of this product.');
            }

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
module.exports.create = async function(req, res, next) {
        try {
            

            let newProduct = new productsModel(req.body);
            let sellerID = req.auth.id;
            console.log(typeof sellerID);
            newProduct.sellerID = sellerID;
            let result = await productsModel.create(newProduct);
            if(result){
                res.json(
                {
                    success: true,
                    message: "Product created sucessfully."
                }
            );}
        } 
    catch (error) {
        console.error("Cannot create product", error);
        res.status(500).send("Invalid product create");
    }
}

// To delete a product
module.exports.delete = async function(req, res, next) {
  try {
        if (!req.body.seller || req.body.seller.trim() === "") {
            throw new Error('login is required.');
        }
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

module.exports.hasAuthorization = async function(req, res, next){
    console.log("Payload", req.auth);
    const product = await productsModel.findById(req.params.productID);

    let authorized = req.auth.id == product.sellerID;
    console.log(authorized);
    if(!authorized){
        return res.status('403').json(
            {
                success: false,
                message: "User is not authorized"
            }
        )
    }
    next();
}

