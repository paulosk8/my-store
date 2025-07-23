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
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://miecommerce.com/recovery?token=${token}`;
    await userService.update(user.id, {
      recoveryToken: token,
    });
    const mail = {
      from: '"Paulo Galarza" <paulogalarza1993@gmail.com>',
      to: `${user.email}`,
      subject: 'Hello My Store',
      html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`, // HTML body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return {
      message: 'Email sent successfully',
    };
  }
}

module.exports = AuthService;
