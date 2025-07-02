const employeesList = require("../model/employeesList");

const getAllEmployees = (req, res) => {
  res.send(employeesList);
};

const createNewEmployee = (req, res) => {
  const { firstname, lastname, birthdate } = req.body;
  const newEmployee = {
    id: employeesList.length + 1,
    firstname,
    lastname,
    birthdate,
  };
  employeesList.push(newEmployee);
  res.status(201).send(newEmployee);
};

const getEmployee = (req, res) => {
  const foundEmployee = employeesList.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!foundEmployee) {
    return res.status(400).json({
      message: `Employee ID ${req.params.id} not found`,
    });
  }
  res.json(foundEmployee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  getEmployee,
};
