const Machine = require('../models/Machine');
const Game = require('../models/Game');


const MachineController = () => {
  const getAll = (req, res) => {
    Machine.findAll()
      .then(machine => {
        res.json(machine);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Machine.find({
      where: { id },
    })
    .then(machine => {
      res.json(machine);
    });
  };

  const post = (req, res) => {
    const body = req.body;
    Machine.create({
      top_cash_amount: body.top_cash_amount,
      is_working: body.is_working,
      cash_amount: body.cash_amount,
      GameId: body.GameId,
    }).then(machine => {
      res.json(machine);
    });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    console.log("updates", updates);
    Machine.find({
      where: { id },
    })
      .then(machine => {
        machine.updateAttributes(updates);
      })
      .then(() => {
        Machine.findAll()
        .then(machines => {
          res.json(machines);
        });
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Machine.destroy({
      where: { id },
    })
      .then(deletedgamemachine => {
        res.json(deletedgamemachine);
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

module.exports = MachineController;
