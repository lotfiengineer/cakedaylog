const express = require("express");
const router = express.Router();
const communitiesController = require("../controllers/communitiesController");

router
  .route("/")
  .get(communitiesController.getAllMembers)
  .post(communitiesController.createNewMember);

router
  .route("/:id")
  .delete(communitiesController.deleteMember)
  .get(communitiesController.getMember);

module.exports = router;
