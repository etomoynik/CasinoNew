const Visitor = require('../models/Visitor');
const User = require('../models/User');

const VisitorController = () => {
  const getAll = (req, res) => {
    Visitor.findAll()
      .then(visitor => {
        res.json(visitor);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Visitor.find({
      where: { id },
    })
    .then(visitor => {
      res.json(visitor);
    });
  };

  const post = (req, res) => {
    const body = req.body;

    User.create({
      name: body.name,
      surname: body.surname,
      date_birth: body.birth,
    }).then(user => {
      Visitor.create({
        UserId: user.id,
        cash: body.cash,
      })
            .then(newvisitor => {
              res.json(newvisitor);
            });
    });
  };

  // PATCH single employee
  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    Visitor.find({
      where: { id },
    })
      .then(visitor => {
        visitor.updateAttributes(updates);
      })
      .then(updatedvisitor => {
        res.json(updatedvisitor);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Visitor.destroy({
      where: { id },
    })
      .then(deletedvisitor => {
        res.json(deletedvisitor);
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

module.exports = VisitorController;
