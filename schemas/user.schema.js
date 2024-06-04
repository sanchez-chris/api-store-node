const Joi = require('joi');

const name =  Joi.string().min(5).max(30);
const jobTitle =  Joi.string().min(5).max(30);
const id =  Joi.string().uuid();

const createUserSchema = Joi.object({
  name: name.required(),
  jobTitle: jobTitle.required()
});

const updateUserSchema = Joi.object({
  name: name,
  jobTitle: jobTitle,
  id: id
});

const getUserSchema = Joi.object({
  id: id.required()
});

const deleteUserSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema
}
