const Accident = require('../models/Accident');

const AccidentController = () => {
  const getAll = (req, res) => {
    Accident.findAll()
      .then(accident => {
        res.json(accident);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Accident.find({
      where: { id },
    })
    .then(accident => {
      res.json(accident);
    });
  };

  const post = (req, res) => {
    const body = req.body;

    Accident.create({
      MachineId: body.MachineId,
      type: body.type,
    }).then(accident => {
      res.json(accident);
    });
  };

  // PATCH single employee
  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    Accident.find({
      where: { id },
    })
      .then(accident => {
        accident.updateAttributes(updates);
      })
      .then(updatedaccident => {
        res.json(updatedaccident);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Accident.destroy({
      where: { id },
    })
      .then(deletedaccident => {
        res.json(deletedaccident);
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

module.exports = AccidentController;
