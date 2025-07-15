const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee);

router
  .route("/:id")
  .delete(employeesController.deleteEmployee)
  .get(employeesController.getEmployee);

module.exports = router;
