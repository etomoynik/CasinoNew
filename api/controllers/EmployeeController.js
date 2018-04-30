const Employee = require('../models/Employee');
const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Sequilize = require('sequelize');


const EmployeeController = () => {
  const get = (req, res) => {
    const id = req.params.id;
    Employee.find({
      where: { id },
    })
    .then(employee => {
      res.json(employee);
    });
  };

  const register = (req, res) => {
    console.log(req.body);
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: 'No data in form' });
    }

    if (body.password && body.email) {
      if (body.password !== body.password2) {
        return res.status(200).json({ msg: 'Passwords dont match' });
      }
      Employee.find({ where: { email: body.email } })
      .then((emp) => {
        if (emp) return res.status(500).json({ msg: 'User exists' });
        User
        .create({
          name: body.name,
          surname: body.surname,
          date_birth: body.date,
        })
        .then(user => {
          Employee
          .findOrCreate({
            where: {
              email: body.email,
              password: body.password,
              UserId: user.id,
              access_level: 1,
            },
          })
          .then((employee) => {
            const token = authService.issue({ id: employee.id });
            return res.status(200).json({ token });
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
      });
    }
  };

  const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
      Employee
        .findOne({
          where: {
            email,
          },
        })
        .then((employee) => {
          if (!employee) {
            return res.status(400).json({ msg: 'Bad Request: User not found' });
          }

          if (bcryptService.comparePassword(password, employee.password)) {
            const token = authService.issue({ id: employee.id });
            Employee.findOne({ where: { id: employee.id } }).then((empl) => {
              empl.updateAttributes({ last_login: Sequilize.fn('NOW') });
            });
            return res.status(200).json({ token, employee });
          }

          return res.status(401).json({ msg: 'Unauthorized' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
    }
  };

  const validate = (req, res) => {
    const tokenToVerify = req.body.token;

    authService
      .verify(tokenToVerify, (err) => {
        if (err) {
          return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
        }

        return res.status(200).json({ isvalid: true });
      });
  };

  const getAll = (req, res) => {
    Employee
      .findAll({
        include: [{
          model: User,
        }],
      },
      )
      .then((employee) => res.status(200).json({ employee }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    Employee.find({
      where: { id },
    })
      .then(employee => {
        employee.updateAttributes(updates);
      })
      .then(updatedemployee => {
        res.json(updatedemployee);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Employee.destroy({
      where: { id },
    })
      .then(deletedemployee => {
        res.json(deletedemployee);
      });
  };

  const logout = (req, res) => {
    const parts = req.header('Authorization').split(' ');
    let token;
    let decoded;
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/.test(scheme)) {
        token = credentials;
      }
    }
    if (req.headers && req.headers.authorization) {
      try {
        decoded = authService.verify(token);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const userId = decoded.id;
      console.log(userId);
      // Fetch the user by id
      Employee.findOne({ where: { id: userId } }).then((employee) => {
        employee.updateAttributes({ last_logout: Sequilize.fn('NOW') });
      });
      return res.status(200).send();
    }
    return res.status(500).json({ msg: 'Internal server error' });
  };
  return {
    register,
    login,
    validate,
    getAll,
    get,
    patch,
    remove,
    logout,
  };
};

module.exports = EmployeeController;
