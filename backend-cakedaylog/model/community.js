const mongoose = require("mongoose");
const memberSchema = require("./member");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: {
    type: [memberSchema],
    default: [],
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
