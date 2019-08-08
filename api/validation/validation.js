// Validation 
let Joi = require('@hapi/joi');

// Sign Up Validation
let signupValidation = data => {  
    let schema = {
        firstName: Joi.string().min(2).regex(/^[A-Z]{1}[a-z]+$/),
        lastName: Joi.string().min(3).regex(/^[A-Z]{1}[a-z]+$/),
        primaryPhone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
};

// Login Validation
let loginValidation = data => {  
    let schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;