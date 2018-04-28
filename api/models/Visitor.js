const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const User = require('./User');
const GameSession = require('./GameSession');


const hooks = {
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  },
};

const tableName = 'visitors';

const Visitor = sequelize.define('Visitor', {
  cash: {
    type: Sequelize.DECIMAL,
  },
  games_count: {
    type: Sequelize.INTEGER,
  },
  spent_cash: {
    type: Sequelize.DECIMAL,
  },
  won_money: {
    type: Sequelize.DECIMAL,
  },
  won_times: {
    type: Sequelize.INTEGER,
  },
}, { hooks, instanceMethods, tableName });

Visitor.belongsTo(User, { onDelete: 'cascade' });
Visitor.hasMany(GameSession, { onDelete: 'SET NULL' });


module.exports = Visitor;
