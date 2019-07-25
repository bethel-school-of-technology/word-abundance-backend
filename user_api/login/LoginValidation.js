// Validation 
let Joi = require('@hapi/joi');

//Login Validation
let loginValidation = data => {  
    let schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;