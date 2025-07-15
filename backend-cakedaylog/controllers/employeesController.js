const employeesList = require("../model/employeesList");
const Employee = require("../model/employee");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname, birthdate } = req.body;

  const employee = new Employee({
    firstname: firstname,
    lastname: lastname,
    birthdate: birthdate,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: `Employee ID ${req.params.id} was not found`,
      });
    }

    await employee.deleteOne();
    res.json({
      message: `Employee ID ${req.params.id} was deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
  deleteEmployee,
  getEmployee,
};
