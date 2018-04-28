const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  date_birth: {
    type: Sequelize.DATE,
  },
}, { hooks, instanceMethods, tableName });

module.exports = User;
