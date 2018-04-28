const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const GameSession = require('./GameSession');
const Accident = require('./Accident');

const hooks = {
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  },
};

const tableName = 'machines';

const Machine = sequelize.define('Machine', {
  top_cash_amount: {
    type: Sequelize.DECIMAL,
  },
  cash_amount: {
    type: Sequelize.DECIMAL,
  },
  is_working: {
    type: Sequelize.BOOLEAN,
  },

}, { hooks, instanceMethods, tableName });

Machine.hasMany(GameSession, { onDelete: 'SET NULL' });
Machine.hasMany(Accident, { onDelete: 'SET NULL' });

module.exports = Machine;
