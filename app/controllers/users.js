const Usermodel = require('../models/users');
let bcrypt = require('bcrypt');

module.exports.list = async function(req, res, next) {
    try {
        let list = await Usermodel.find({}, '-hashed_password -salt');
        res.json(list);
    } catch (error) {
        next(error);
    }
}

module.exports.userByID = async function(req, res, next){
    try {
        console.log(`/getu/${req.params.userID}`);
        const user = await Usermodel.findById(req.params.userID);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Send the user data in the response
        res.json({
            success: true,
            message: "User found by ID",
            user: user
        });
    } catch (error) {
        console.error("Error in search", error);
        res.status(500).send("Invalid search");
    }
}

module.exports.read = function(req, res) {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

module.exports.update = async function (req, res, next){
     try {
            let userID = req.params.userID;
            let updatedUser = Usermodel(req.body);
            updatedUser._id = userID;
        
            let result = await Usermodel.updateOne({ _id: userID }, updatedUser);
        
            if (result.modifiedCount > 0) {
                res.json(
                    {success: true,
                    message: "User updated sucessfully."
                });
            }
            // Express will catch this on its own.
            else {
                 throw new Error('User not updated. Are you sure it exists?')
                }
        
        }
        catch(error){
        console.error("Error in update:", error);
        res.status(500).send("Invalid update");
    }
}

async function hashPassword(password){
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      return hashedPassword;
  } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
  }
  }
  

module.exports.create = async function (req, res, next){
    try {
        let newUser = new Usermodel(req.body);
        newUser.hashed_password = await hashPassword(newUser.hashed_password);

        console.log(newUser);


        let result = await Usermodel.create(newUser);
        res.json({
            success: true,
            message: "User created successfully.",
            user: result
        });
        console.log(newUser.hashed_password);
    } catch (error) {
        console.error("Cannot create user", error);
        res.status(500).send("Invalid user create");
    }
}

module.exports.remove = async function (req, res, next){
    try{
        console.log("/deleteu/:userID");
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
module.exports.signup_get = async function(req, res, next) {
    res.send('SignUp');
}
