const boom = require('boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create(
      {
        ...data,
        user: {
          ...data.user,
          password: hash,
        },
      },
      {
        include: ['user'],
      },
    );
    return newCustomer;
  }

  async find() {
    const rst = await models.Customer.findAll({
      include: ['user'],
    });
    return rst;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    } else {
      return customer;
    }
  }

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    } else {
      await customer.destroy();
      return { id };
    }
  }
}

module.exports = CustomerService;
