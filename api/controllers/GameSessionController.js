const GameSession = require('../models/GameSession');

const GameSessionController = () => {
  const getAll = (req, res) => {
    GameSession.findAll()
      .then(gameSession => {
        res.json(gameSession);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    GameSession.find({
      where: { id },
    })
    .then(gameSession => {
      res.json(gameSession);
    });
  };

  const post = (req, res) => {
    const body = req.body;
    GameSession.create({
      GameId: body.GameId,
      MachineId: body.MachineId,
      VisitorId: body.VisitorId,
      score: 0,
    }).then(gameSession => {
      res.json(gameSession);
    });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    GameSession.find({
      where: { id },
    })
      .then(gameSession => {
        gameSession.updateAttributes(updates);
      })
      .then(updatedgameSession => {
        res.json(updatedgameSession);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    GameSession.destroy({
      where: { id },
    })
      .then(deletedgameSession => {
        res.json(deletedgameSession);
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

module.exports = GameSessionController;
