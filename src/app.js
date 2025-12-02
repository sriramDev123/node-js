const express = require("express");

const app = express();

//request handler

//This will match al the http methods api calls to test
// app.use("/test", (req, res) => {
//   res.send("Hello From the server!");
// });

//this only handles GET Calls
app.get("/user", (req, res) => {
  res.send({ firstnamwe: "Sriram", Lastname: "Cherukuri" });
});

app.post("/user", (req, res) => {
  res.send("Data has been posted to DataBase..!");
});

app.delete("/user", (req, res) => {
  res.send("User has been deleted from DataBase..!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
