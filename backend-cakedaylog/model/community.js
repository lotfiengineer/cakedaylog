const mongoose = require("mongoose");
const memberSchema = require("./member");

const communitySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members: {
    type: [memberSchema],
    default: [],
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
