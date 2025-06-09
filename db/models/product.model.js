const { Sequelize, Model, DataTypes } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');
const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category_id',
    unique: true,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, Product, ProductSchema };
