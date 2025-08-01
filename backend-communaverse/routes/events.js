const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.route("/").post(eventsController.create);

router.route("/:communityId").get(eventsController.getByCommunityId);

router.route("/:eventId").delete(eventsController.deleteById);

module.exports = router;
