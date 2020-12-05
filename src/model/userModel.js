const Joi = require("joi");

const UserModel = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    role: Joi.number(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

module.exports= UserModel