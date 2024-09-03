const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const res = await models.Category.findAll();
    return res;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('user not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const res = await category.update(changes);
    return res;
  }

  async delete(id) {
    const category = await category.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;


