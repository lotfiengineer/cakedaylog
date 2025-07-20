const express = require("express");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const connectToDB = require("./config/dbConnection");
require("dotenv").config();
const app = express();
const PORT = 3770;

app.get("/", (req, res) => {
  res.send("Hello, This is cakedaylog.com");
});

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/communities", require("./routes/communities"));
app.use("/api/communities", require("./routes/members"));

connectToDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
