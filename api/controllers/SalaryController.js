const Salary = require('../models/Salary');

const SalaryController = () => {
  const getAll = (req, res) => {
    Salary.findAll()
      .then(salary => {
        res.json(salary);
      });
  };

  const get = (req, res) => {
    const id = req.params.id;
    Salary.find({
      where: { id },
    })
    .then(salary => {
      res.json(salary);
    });
  };

  const post = (req, res) => {
    const body = req.body;
    Salary.create({
      employee_id: body.employee_id,
      cash_amount: body.cash_amount,
      fixed_machines: body.fixed_machines,
      incassed_machines: body.incassed_machines,
      putted_cash: body.putted_cash,
      multiplier: body.multiplier,
      who_changed: body.who_changed,
      when_changed: body.when_changed,
    }).then(salary => {
      res.json(salary);
    });
  };

  const patch = (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    Salary.find({
      where: { id },
    })
      .then(salary => {
        salary.updateAttributes(updates);
      })
      .then(updatedsalary => {
        res.json(updatedsalary);
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    Salary.destroy({
      where: { id },
    })
      .then(deletedsalary => {
        res.json(deletedsalary);
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

module.exports = SalaryController;
