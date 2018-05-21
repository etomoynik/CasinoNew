const Game = require('../models/Game');
const User = require('../models/User');
const Machine = require('../models/Machine');

const GameController = () => {
  const getAll = (req, res) => {
    Game.findAll()
      .then(game => {
        res.json(game);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Game.find({
      where: { id },
    })
    .then(game => {
      res.json(game);
    });
  };

  const getMachines = (req, res) => {
    const id = req.params.id;
    Machine.findAll({
      where: { GameId: id },
    })
    .then(machines => {
      Machine.count()
      .then(count => {
        res.json({ count, machines });
      });
    });
  };

  const postMachines = (req, res) => {
    let gameId = req.params.id;
    const machineId = req.body.machine_id;
    if (gameId == -1) {
      gameId = null;
    }
    console.log(req.body);
    Machine.find({
      where: { id: machineId },
    })
    .then(machine => {
      machine.updateAttributes({ GameId: gameId })
      .then(() => getMachines(req, res));
    });
  };

  const post = (req, res) => {
    const body = req.body;
    Game.create({
      name: body.name,
      can_win: body.can_win,
      chance: body.chance,
    }).then(game => {
      res.json(game);
    });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const chance = req.body.chance;
    Game.find({
      where: { id },
    })
      .then(game => {
        game.updateAttributes({ chance });
      })
      .then(updatedgame => {
        res.json('updated');
      })
      .catch(err => {
        res.header(400);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Game.destroy({
      where: { id },
    })
      .then(deletedgame => {
        res.json(deletedgame);
      });
  };

  return {
    getAll,
    get,
    patch,
    remove,
    post,
    getMachines,
    postMachines,
  };
};

module.exports = GameController;
