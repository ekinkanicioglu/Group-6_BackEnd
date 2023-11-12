let User = require('../models/users');
let config = require('../../config/config');
let { expressjwt } = require('express-jwt');



module.exports.signIn = function(req, res, next){
        let user = User.findOne({"email" : req.body.email});

        if((user === undefined || user === null) ){
            throw new Error("User does not exist.");

        }



}

