const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {

      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      })
    }
  }

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct);

    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id);

    if (!product) {
      throw boom.notFound('this id dont exists')
    }

    return product;
  }

  update(id, data) {

    if ( !this.products.some((product) => product.id === id) ) {
      throw boom.notFound('this id dont exists')
    }

    const index = this.products.findIndex( item => (item.id === id) );
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...data
    };

    return this.products[index];
  }

  delete(id) {

    if ( !this.products.some((product) => product.id === id) ) {
      throw boom.notFound('this id don\'t exists')
    }

    const index = this.products.findIndex( item => (item.id === id) );

    this.products.splice(index, 1);

    return {
      message: 'deleted',
      id,
    };

  }
}

module.exports = ProductService;
