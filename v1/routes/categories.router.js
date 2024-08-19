
const express = require('express');
const CategoryService = require('../../services/category.service.js');
const validatorHandler = require('../../middlewares/validator.handle.js');
const { getCategorySchema, createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('../../schemas/category.schema.js');

const router = express.Router();
const service = new CategoryService();



router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {

  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.status(200).json(category);

  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {

    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json(newCategory);
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params
      const body = req.body;
      const category = await service.update(id, body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }

  }
);

router.delete('/:id',
  validatorHandler(deleteCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await service.delete(id)
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }

});

module.exports = router;

