const express = require("express");
const app = express();
const PORT = 3770;

app.get("/", (req, res) => {
  res.send("Hello, This is cakedaylog.com");
});

app.use(express.json());

app.use("/api/employees", require("./routes/employees"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});