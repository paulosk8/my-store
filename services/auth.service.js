const UserService = require('./user.service');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

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
  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sing(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }
  async sendMail(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: 'paulogalarza1993@gmail.com',
        pass: 'shxerifhbetfcyxo',
      },
    });
    await transporter.sendMail({
      from: '"Paulo Galarza" <paulogalarza1993@gmail.com>',
      to: `${user.email}`,
      subject: 'Hello My Store',
      text: 'Email de prueba de la asigantura de Aplicaciones Distribuidas', // plain‑text body
      html: '<b>Hello world ESPE</b>', // HTML body
    });
    return {
      message: 'Email sent successfully',
    };
  }
}

module.exports = AuthService;
