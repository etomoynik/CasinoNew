const Game = require('../models/Game');

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
    const updates = req.body.updates;
    Game.find({
      where: { id },
    })
      .then(game => {
        game.updateAttributes(updates);
      })
      .then(updatedgame => {
        res.json(updatedgame);
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
  };
};

module.exports = GameController;
