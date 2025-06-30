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

module.exports = {
  getAllEmployees,
  createNewEmployee,
};

