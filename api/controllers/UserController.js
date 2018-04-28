const User = require('../models/User');

const UserController = () => {
  const getAll = (req, res) => {
    User.findAll()
      .then(user => {
        res.json(user);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    User.find({
      where: { id },
    })
    .then(user => {
      res.json(user);
    });
  };
  // POST single employee
  const post = (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const dateBirth = req.body.date_birth;
    User.create({
      name,
      surname,
      date_birth: dateBirth,
    })
      .then(newuser => {
        res.json(newuser);
      });
  };

  // PATCH single employee
  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    User.find({
      where: { id },
    })
      .then(user => {
        user.updateAttributes(updates);
      })
      .then(updateduser => {
        res.json(updateduser);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id },
    })
      .then(deleteduser => {
        res.json(deleteduser);
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

module.exports = UserController;
