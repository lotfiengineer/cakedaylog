const express = require("express");
const router = express.Router();
const Event = require('../model/event');

router.route("/").get((req, res) => {
  res.json({
    message: "This will be implemented",
  });
});

module.exports = router;
