const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");

const member = membersController;

router.route("/").post(member.create).get(member.getAll);

router
  .route("/:id")
  .get(member.getById)
  .put(member.update)
  .delete(member.delete);

module.exports = router;
