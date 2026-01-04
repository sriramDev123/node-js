const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //when user signup validate the dataa coming from signup API/req.body
    validateSignupData(req);
    console.log(req.body);
    //hash the password before saving to database
    const { firstname, lastname, email, password } = req.body;

    const hashesPassword = await bcrypt.hash(password, 10);

    //creating a new instance of User model
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashesPassword,
    });

    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found with this email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //create a JWT Token

      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");

      // Create a cookie and out JWT inside and send back to user
      res.cookie("token", token);

      res.send(" Login successfully.....!");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Token Invalid");
    }
    //validate my token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
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

app.patch("/userupdate/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const UpdatedData = ["photoUrl", "about", "Skills", "age", "gender"];
    const isUpdated = Object.keys(data).every((k) => UpdatedData.includes(k));
    if (!isUpdated) {
      throw new Error("Update Not Allowed !");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATED MESSAGE:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(8888, () => {
      console.log("Server is Listening on port 8888");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
