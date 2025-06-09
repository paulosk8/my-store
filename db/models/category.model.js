const { Sequelize, Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, Category, CategorySchema };
