const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Machine = require('./Machine');
const GameSession = require('./GameSession');

const hooks = {
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  },
};

const tableName = 'games';

const Game = sequelize.define('Game', {
  name: {
    type: Sequelize.TEXT,
  },
  can_win: {
    type: Sequelize.DECIMAL,
  },
  chance: {
    type: Sequelize.DECIMAL,
  },
  spent_money: {
    type: Sequelize.DECIMAL,
  },
  won_money: {
    type: Sequelize.DECIMAL,
  },

}, { hooks, instanceMethods, tableName });

Game.hasMany(GameSession, { onDelete: 'SET NULL' });
Game.hasMany(Machine, { onDelete: 'SET NULL' });

module.exports = Game;
