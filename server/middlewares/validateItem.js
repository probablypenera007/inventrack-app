const { celebrate, Joi, Segments } = require('celebrate');


const itemValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    itemID: Joi.alternatives().try(
      Joi.string().optional().allow(null, ''),
      Joi.number().integer().optional().allow(null, '')
    ),
    name: Joi.string().trim().required().messages({
      'string.base': 'Item name must be a string',
      'string.empty': 'Item name must not be empty',
      'any.required': 'Item name is required'
    }),
    quantity: Joi.number().integer().min(0).required().messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be a non-negative number',
      'any.required': 'Quantity is required'
    }),
    price: Joi.number().precision(2).min(0).required().messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be a non-negative number',
      'any.required': 'Price is required'
    })
  })
});


module.exports = {
  itemValidation,
};
