const express = require("express");

const app = express();

app.use("/user", [
  (req, res, next) => {
    res.send("Responded 1..!");
    next();
  },
  (req, res) => {
    res.send("Responded 2..!");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
