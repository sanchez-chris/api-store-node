const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');


class UserService {

  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        name: faker.person.fullName(),
        jobTitle: faker.person.jobTitle(),
        id: faker.string.uuid()
      });
    };
  }

  create(data) {

    const newUser = {
      id: faker.string.uuid(),
      ...data
    }

    this.users.push(newUser);

    return newUser;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  findOne(id) {
    const user = this.users.find(item => item.id === id);

    if (!user) {
      throw boom.notFound('this id dont exists')
    }
    return user;
  }

  update(id, data) {

    if ( !this.users.some((user) => user.id === id) ) {
      throw boom.notFound('this id doesnt exists')
    }
    const index = this.users.findIndex( item => (item.id === id) );
    const user = this.users[index];

    this.users[index] = {
      ...user,
      ...data
    };

    return this.users[index];
  }

  delete(id) {
    if ( !this.users.some((users) => users.id === id) ) {
      throw boom.notFound('this id don\'t exists')
    }
    const index = this.users.findIndex( item => (item.id === id) );

    this.users.splice(index, 1);

    return {
      message: 'deleted',
      id,
    };

  }


}

module.exports = UserService
