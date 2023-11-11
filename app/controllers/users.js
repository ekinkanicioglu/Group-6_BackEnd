const Usermodel = require('../models/users');

//get all users
module.exports.list = async function(req, res, next) {
    try {
        let list = await Usermodel.find({}, '-hashed_password -salt');
        res.json(list);
    } catch (error) {
        next(error);
    }
}

//get user by id
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

//update users

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

//create users
module.exports.create = async function (req, res, next){
    try {
        let newUser = new Usermodel(req.body);

        let result = await Usermodel.create(newUser);
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

//remove users by id
module.exports.remove = async function (req, res, next){
    try {
        const userID = req.params.userID;
        const result = await Usermodel.deleteOne({ _id: userID });

        if (!result) {
            return res.status(404).send("User not found");
        }

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "User deleted"
                }
            );
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error in delete:", error);
        res.status(500).send("Invalid delete");
    }
}

