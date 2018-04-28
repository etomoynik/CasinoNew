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

const tableName = 'penalties';

const Penalty = sequelize.define('Penalty', {
  amount: {
    type: Sequelize.DECIMAL,
  },
  date_of_issue: {
    type: Sequelize.DATE,
  },
  reason: {
    type: Sequelize.TEXT,
  },

}, { hooks, instanceMethods, tableName });

module.exports = Penalty;
