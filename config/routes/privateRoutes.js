module.exports = {
  'GET /accident': 'AccidentController.getAll',
  'GET /accident/:id': 'AccidentController.get',
  'POST /accident': 'AccidentController.post',
  'PATCH /accident/:id': 'AccidentController.patch',
  'DELETE /accident/:id': 'AccidentController.remove',

  'GET /employee': 'EmployeeController.getAll',
  'GET /employee/:id': 'EmployeeController.get',
  'POST /employee': 'EmployeeController.login',
  'PATCH /employee/:id': 'EmployeeController.patch',
  'DELETE /employee/:id': 'EmployeeController.remove',
  'POST /logout': 'EmployeeController.logout',

  'GET /game': 'GameController.getAll',
  'GET /game/:id': 'GameController.get',
  'POST /game': 'GameController.post',
  'PATCH /game/:id': 'GameController.patch',
  'DELETE /game/:id': 'GameController.remove',

  'GET /gamesession': 'GameSessionController.getAll',
  'GET /gamesession/:id': 'GameSessionController.get',
  'POST /gamesession': 'GameSessionController.post',
  'PATCH /gamesession/:id': 'GameSessionController.patch',
  'DELETE /gamesession/:id': 'GameSessionController.remove',

  'GET /machine': 'MachineController.getAll',
  'GET /machine/:id': 'MachineController.get',
  'POST /machine': 'MachineController.post',
  'PATCH /machine/:id': 'MachineController.patch',
  'DELETE /machine/:id': 'MachineController.remove',

  'GET /penalty': 'PenaltyController.getAll',
  'GET /penalty/:id': 'PenaltyController.get',
  'POST /penalty': 'PenaltyController.post',
  'PATCH /penalty/:id': 'PenaltyController.patch',
  'DELETE /penalty/:id': 'PenaltyController.remove',

  'GET /salary': 'SalaryController.getAll',
  'GET /salary/:id': 'SalaryController.get',
  'POST /salary': 'SalaryController.post',
  'PATCH /salary/:id': 'SalaryController.patch',
  'DELETE /salary/:id': 'SalaryController.remove',

  'GET /user': 'UserController.getAll',
  'GET /user/:id': 'UserController.get',
  'POST /user': 'UserController.post',
  'PATCH /user/:id': 'UserController.patch',
  'DELETE /user/:id': 'UserController.remove',

  'GET /visitor': 'VisitorController.getAll',
  'GET /visitor/:id': 'VisitorController.get',
  'POST /visitor': 'VisitorController.post',
  'PATCH /visitor/:id': 'VisitorController.patch',
  'DELETE /visitor/:id': 'VisitorController.remove',
};
