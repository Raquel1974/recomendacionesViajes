const joi = require ("joi");

const esquemaRegistro = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().min(5).max(80).required(),
    password: joi.string().min(6).max(100).required(),
    avatar: joi.string(),
})

module.exports = esquemaRegistro;