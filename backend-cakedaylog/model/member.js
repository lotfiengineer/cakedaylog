const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
});

module.exports = memberSchema;