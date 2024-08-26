
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');
class CategoryService {

  constructor() {
    this.categories = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {

      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
      })
    }
    }

  create(data) {

    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }

    this.categories.push(newCategory);

    return newCategory;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  findOne(id) {
    const category = this.categories.find(item => item.id === id);

    if (!category) {
      throw boom.notFound('this id dont exists')
    }

    return category;
  }

  update(id, data) {

    if ( !this.categories.some((category) => category.id === id) ) {
      throw boom.notFound('this id dont exists')
    }

    const index = this.categories.findIndex( item => (item.id === id) );
    const category = this.categories[index];

    this.categories[index] = {
      ...category,
      ...data
    };

    return this.categories[index];
  }

  delete(id) {

    if ( !this.categories.some((category) => category.id === id) ) {
      throw boom.notFound('this id don\'t exists')
    }

    const index = this.categories.findIndex( item => (item.id === id) );

    this.categories.splice(index, 1);

    return {
      message: 'deleted',
      id,
    };

  }
}

module.exports = CategoryService

