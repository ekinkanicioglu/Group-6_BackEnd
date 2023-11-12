let User = require('../models/users');
let config = require('../../config/config');
let { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({ id }, config.TOKENKEY,{
        algorithm: 'HS512',
        expiresIn: "20min"
    });
}

module.exports.signIn = function(req, res, next){
        let user = User.findOne({"email" : req.body.email});

        if((user === undefined || user === null) ){
            throw new Error("User does not exist.");
        }
        else{
           if(user.hashedPassword == this.hashedPassword){
            return true;
           }
           if(user.hashedPassword!=this.hashedPassword){
            return false;
           }
        }
}

module.exports.signup_post = async (req, res) =>{
    const{email, password} = req.body;

    try{
        const user = await User.create({email, password});
        const token = createToken(this.hashed_password);
        res.cookie('jwt', token);
        res.status(201).json(User);
    }
    catch(err){
        res.status(400).json({errors});
    }
}
