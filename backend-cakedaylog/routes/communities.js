const express = require("express");
const router = express.Router();
const communitiesController = require("../controllers/communitiesController");

const community = communitiesController;

router.route("/").post(community.create).get(community.getAll);

router
  .route("/:id")
  .get(community.getById)
  .put(community.update)
  .delete(community.delete);

module.exports = router;
