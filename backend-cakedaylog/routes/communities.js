const express = require("express");
const router = express.Router();
const communitiesController = require("../controllers/communitiesController");
const authMiddleware = require("../middleware/authMiddleware");

const community = communitiesController;

router.route("/").post(authMiddleware, community.create).get(community.getAll);

router
  .route("/:id")
  .get(community.getById)
  .put(authMiddleware, community.update)
  .delete(authMiddleware, community.delete);

module.exports = router;
