const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('../middlewares/validator.handle');
const { getUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch(error) {
    next(error);
  }

});


router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);

    } catch (error) {
      next(error)
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {

    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json(newUser)
  });

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
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
