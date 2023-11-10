const Usermodel = require('../models/users');


module.exports.list = async function(req, res, next) {
    console.log("/:userID/list");
    res.send("List all users");
}

module.exports.userByID = async function(req, res, next){
    try{
        console.log("/:userID/listId");
        const user = await Usermodel.findById(req.params.userID);
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.send("List user by ID");
      }
      catch (error){
        console.error("Error in seach", error);
        res.status(500).send("Invalid search");
      }
}

module.exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

module.exports.update = async (req, res, next) =>{
    try{
        console.log("/:userID/modify");
        const updateUser = await Usermodel.findById(req.params.userID);
        if (!updateUser) {
          return res.status(404).send("User not found");
        }
    
        if (updateUser.owner.toString() !== req.params.userID) {
          return res.status(403).send("Permission denied. You are not the user.");
        }
    
        // Logic to modify a product
        res.send("User updated");
    }
    catch(error){
        console.error("Error in update:", error);
        res.status(500).send("Invalid update");
    }
}

module.exports.create = async function (req, res, next){
    try {
        let newUser = new Usermodel(req.body);

        let result = await newUser.create(newUser);
        res.json(
            {
                success: true,
                message: "User created sucessfully."
            }
        );
    } 
    catch (error) {
        console.error("Cannot create user", error);
        res.status(500).send("Invalid user create");
    }
}

module.exports.remove = async function (req, res, next){
    try{
        console.log("/:userID/delete");
        const deleteUser = await Usermodel.findById(req.params.userID);
        if (!deleteUser) {
            return res.status(404).send("User not found");
        }

        if (deleteUser.owner.toString() !== req.params.userID) {
            return res.status(403).send("Permission denied. Inappropriate user.");
        }
        res.send("Delete a user");
    }
    catch(error) {
        console.error("Error in delete:", error);
        res.status(500).send("Invalid delete");
    }
}

