const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

const Accident = require('./Accident');
const User = require('./User');
const Salary = require('./Salary');
const Penalty = require('./Penalty');

const hooks = {
  beforeCreate(employee) {
    employee.password = bcryptSevice.password(employee); // eslint-disable-line no-param-reassign
  },
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  },
};

const tableName = 'employees';

const Employee = sequelize.define('Employee', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  access_level: {
    type: Sequelize.INTEGER,
  },
  last_login: {
    type: Sequelize.DATE,
  },
  last_logout: {
    type: Sequelize.DATE,
  },
  when_deleted: {
    type: Sequelize.DATE,
  },
}, { hooks, instanceMethods, tableName });

Employee.belongsTo(User, { onDelete: 'cascade' });
Employee.hasMany(Accident, { onDelete: 'SET NULL' });
Employee.hasMany(Salary, { foreignKey: 'who_changed', onDelete: 'SET NULL' });
Employee.hasMany(Salary, { foreignKey: 'employee_id', onDelete: 'SET NULL' });
Employee.hasMany(Penalty, { foreignKey: 'to_employee_id', onDelete: 'SET NULL' });
Employee.hasMany(Penalty, { foreignKey: 'from_employee_id', onDelete: 'SET NULL' });
Employee.hasMany(Employee, { foreignKey: 'deleted_by', onDelete: 'SET NULL' });

module.exports = Employee;
