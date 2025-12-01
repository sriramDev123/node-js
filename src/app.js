const express = require("express");

const app = express();

//request handler
app.use("/", (req, res) => {
  res.send("Welcome sriram Cherukuri server!");
});
app.use("/test", (req, res) => {
  res.send("Hello From the server!");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello server!");
});

app.use("/Home", (req, res) => {
  res.send("Home page From the server!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
