const { Model, DataTypes, sequelize } = require('sequelize');

const PRODUCT_TABLE = 'users';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'id'
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name'
  },
  price: {
    allowNull: false,
    type: DataTypes.NUMBER,
    field: 'price'
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'image'
  }
}

class Product extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}


module.exports = { PRODUCT_TABLE, ProductSchema, Product }
