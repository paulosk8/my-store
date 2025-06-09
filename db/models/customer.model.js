const { Sequelize, Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
    this.hasMany(models.Order, {
      as: 'order',
      foreignKey: 'customerId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}
module.exports = { CUSTOMER_TABLE, Customer, CustomerSchema };
