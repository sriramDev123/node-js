const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Gone went wrong..!");
  }
});

app.use("/user/getdata", (req, res) => {
  throw new Error("Forced Error");
  res.send("User Data Accessed");
});

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong..!");
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
