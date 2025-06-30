const express = require("express");
const app = express();
const PORT = 3770;

app.get("/", (req, res) => {
  res.send("Hello, This is cakedaylog.com");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
