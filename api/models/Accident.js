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

const tableName = 'accidents';

const Accident = sequelize.define('Accident', {
  date_fixed: {
    type: Sequelize.DATE,
  },
  cash_amount: {
    type: Sequelize.DECIMAL,
  },
  type: {
    type: Sequelize.ENUM('out_of_cash', 'out_of_space_for_cash', 'other'),
  },

}, { hooks, instanceMethods, tableName });

module.exports = Accident;
