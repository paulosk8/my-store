const UserService = require('./user.service');
const boom = require('boom');
const bcrypt = require('bcrypt');

const userService = new UserService();
class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized(), false);
    }
    delete user.dataValues.password; // Remove password from user object
    return user;
  }
  singToken() {}
  sendMail() {}
}

module.exports = new AuthService();
