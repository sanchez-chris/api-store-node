const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'users';

const CategorySchema = {
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
  }
}

class Category extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}


module.exports = { CATEGORY_TABLE, CategorySchema, Category }
