const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
