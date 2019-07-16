// Validation 
let Joi = require('@hapi/joi');

//Sign Up Validation
let signupValidation = data => {  
    let schema = {
        firstName: Joi.string().min(6).required(),
        lastName: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

//Login Validation
let loginValidation = data => {  
    let schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;