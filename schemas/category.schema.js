
const Joi = require('joi');

const name =  Joi.string().min(5).max(30);
const id =  Joi.string().uuid();

const createCategorySchema = Joi.object({
  name: name.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  id: id
});

const getCategorySchema = Joi.object({
  id: id.required()
});

const deleteCategorySchema = Joi.object({
  id: id.required()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema
}

