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

const tableName = 'game_sessions';

const GameSession = sequelize.define('GameSession', {
  from_date: {
    type: Sequelize.DATE,
  },
  to_date: {
    type: Sequelize.DATE,
  },
  score: {
    type: Sequelize.DECIMAL,
  },

}, { hooks, instanceMethods, tableName });

module.exports = GameSession;
