const express = require("express");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const connectToDB = require("./config/dbConnection");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();
const app = express();
const PORT = 3770;

app.get("/", (req, res) => {
  res.send("Hello, This is communaverse.com");
});

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/communities", require("./routes/communities"));
app.use("/api/communities", authMiddleware, require("./routes/members"));
app.use("/api/events", authMiddleware, require("./routes/events"));

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
