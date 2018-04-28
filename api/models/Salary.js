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

const tableName = 'salaries';

const Salary = sequelize.define('Salary', {
  date: {
    type: Sequelize.DATE,
  },
  amount: {
    type: Sequelize.DECIMAL,
  },
  fixed_machines: {
    type: Sequelize.INTEGER,
  },
  incassed_machines: {
    type: Sequelize.INTEGER,
  },
  putted_cash_times: {
    type: Sequelize.INTEGER,
  },
  multiplier: {
    type: Sequelize.DECIMAL,
  },
  when_changed: {
    type: Sequelize.DATE,
  },
}, { hooks, instanceMethods, tableName });

module.exports = Salary;
