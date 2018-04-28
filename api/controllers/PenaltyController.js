const Penalty = require('../models/Penalty');

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
  };
};

module.exports = PenaltyController;
