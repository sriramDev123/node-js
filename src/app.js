const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user", err.message);
  }
});

app.get("/user", async (req, res) => {
  const users = req.body.email;

  try {
    const userData = await User.find({ email: users });

    if (userData.length === 0) {
      res.status(404).send("user Not found");
    } else {
      res.send(userData);
    }
  } catch {
    res.status(500).send("Something went wrong");
  }
});

//Feed API when user signup home page has to setup with cards data get data from database and display on UI..

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

//delete API
app.delete("/userdel", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch {
    res.status(500).send("Error occured while deleting the user");
  }
});

app.patch("/userupdate", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    res.send("User updated successfully");
  } catch {
    res.status(500).send("Error occured while updating the user");
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
