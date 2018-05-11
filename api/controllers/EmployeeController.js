const Employee = require('../models/Employee');
const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Sequelize = require('sequelize');


const EmployeeController = () => {
  const get = (req, res) => {
    const id = req.params.id;
    Employee.findOne(
      {
        where: {
          id,
        },
      },
    )
    .then(employee =>
    Employee
      .findOne(
      {
        include: [{
          model: User,
          where: {
            id: employee.UserId,
          },
        }],
      },
      )
    .then(empl => res.status(200).json({ empl }))
    .catch(err => res.json('Server error')));
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
              access_level: 0,
              last_login: Sequelize.fn('NOW'),
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
      Employee.findOne(
        {
          where: {
            email,
          },
        },
      )
      .then(employee =>
      Employee
        .findOne(
        {
          include: [{
            model: User,
            where: {
              id: employee.UserId,
            },
          }],
        },
        )
        .then(empl => {
          if (bcryptService.comparePassword(password, empl.password)) {
            const token = authService.issue({ id: empl.id });
            empl.updateAttributes({ last_login: Sequelize.fn('NOW') });
            return res.status(200).json({ token, empl });
          }
          return res.status(401).json({ msg: 'Unauthorized' });
        })
        .catch(err => res.status(401).json({ msg: 'Unauthorized' }))
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }));
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

  const removeById = (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    const fromId = authService.verify(token).id;
    const toId = parseInt(req.params.id, 10);
    Employee.findById(fromId, { attributes: ['access_level'] })
      .then(fromEmp => {
        Employee.findById(toId, { attributes: ['access_level'] })
          .then(toEmp => {
            if (fromEmp.access_level > toEmp.access_level) {
              Employee.destroy({
                where: { id: toId },
              })
                .then(() => {
                  getAll(req, res);
                })
              .catch(err => {
                res.status(500).json({ msg: err });
              });
            } else {
              res.status(400).json({ msg: 'not enough access level' });
            }
          })
          .catch(err => {
            res.status(500).json({ msg: 'error' });
          });
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
        employee.updateAttributes({ last_logout: Sequelize.fn('NOW') });
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
    removeById,
  };
};

module.exports = EmployeeController;
