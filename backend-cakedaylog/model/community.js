const mongoose = require("mongoose");
const employeeSchema = require('./employee')

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
    type: [employeeSchema],
    default: [],
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
