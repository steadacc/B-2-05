const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_create_cart_input = validator.body({
  file_name: Joi.string().required(),
  tags: Joi.object().required(),
}, { joi: { abortEarly: false } })
