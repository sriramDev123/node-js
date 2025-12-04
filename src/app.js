const express = require("express");

const app = express();

const { UserAuth, adminAuth } = require("./middlewares/auth");

//middleware i can handle all the request before sending response
app.use("/user", UserAuth);

// app.use("/admin", adminAuth);

app.use("/admin/getdata", adminAuth, (req, res) => {
  res.send("All admin data has been fetched");
});

app.use("/admin/login", adminAuth, (req, res) => {
  res.send("Login to admin panel Successful");
});

app.use("/user/getdata", (req, res) => {
  res.send("All user data has been fetched");
});

app.use("/user/delete", (req, res) => {
  res.send("All Data has been Deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
