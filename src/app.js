const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User({
    firstname: "Virat",
    lastname: "Kohli",
    email: "Virat@gmail.com",
    password: "Virat@123",
    age: 37,
    gender: "Male",
  });

  try {
    await user.save();

    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
