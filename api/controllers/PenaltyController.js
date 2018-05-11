const Penalty = require('../models/Penalty');
const authService = require('../services/auth.service');
const Employee = require('../models/Employee');
const Sequelize = require('sequelize');


const PenaltyController = () => {
  const getAll = (req, res) => {
    Penalty.findAll()
      .then(penalty => {
        res.json(penalty);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Penalty.find({
      where: { id },
    })
    .then(penalty => {
      res.json(penalty);
    });
  };

  const getByEmployeeId = (req, res) => {
    const id = req.params.id;
    Penalty.findAll({
      where: { to_employee_id: id },
    })
    .then(penalty => {
      res.json(penalty);
    });
  };

  const postByEmployeeId = (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    const fromId = authService.verify(token).id;
    const toId = parseInt(req.params.id, 10);
    console.log(req.body.amount);
    Employee.findById(fromId, { attributes: ['access_level'] })
      .then(fromEmp => {
        Employee.findById(toId, { attributes: ['access_level'] })
          .then(toEmp => {
            if (fromEmp.access_level > toEmp.access_level) {
              Penalty.create({
                to_employee_id: toId,
                amount: req.body.amount,
                reason: req.body.reason,
                from_employee_id: fromId,
                date_of_issue: Sequelize.fn('NOW'),
              })
              .then(() => {
                Penalty.findAll({
                  where: { to_employee_id: toId },
                })
                .then(penalty => {
                  res.json(penalty);
                });
              })
              .catch(err => {
                res.status(500).json({ msg: '' });
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

  const post = (req, res) => {
    const body = req.body;
    Penalty.create({
      to_employee_id: body.to_employee_id,
      from_employee_id: body.from_employee_id,
      amount: body.amount,
      reason: body.reason,
    }).then(penalty => {
      res.json(penalty);
    });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    Penalty.find({
      where: { id },
    })
      .then(penalty => {
        penalty.updateAttributes(updates);
      })
      .then(updatedpenalty => {
        res.json(updatedpenalty);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Penalty.destroy({
      where: { id },
    })
      .then(deletedpenalty => {
        res.json(deletedpenalty);
      });
  };

  return {
    getAll,
    get,
    patch,
    remove,
    post,
    getByEmployeeId,
    postByEmployeeId,
  };
};

module.exports = PenaltyController;
