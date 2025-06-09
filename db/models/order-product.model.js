const { Sequelize, Model, DataTypes } = require('sequelize');

const { PRODUCT_TABLE } = require('./product.model');
const { ORDER_TABLE } = require('./order.model');
const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrderProduct extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}
module.exports = { ORDER_PRODUCT_TABLE, OrderProduct, OrderProductSchema };
