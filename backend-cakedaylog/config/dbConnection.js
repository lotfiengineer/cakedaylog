const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("I am connected baby!!");
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
};

module.exports = connectToDB;
