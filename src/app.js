const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("./middlewares/auth");

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

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //create a JWT Token

      const token = await user.getJWT();

      // Create a cookie and out JWT inside and send back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 78 * 3600000),
        httpOnly: true,
      });

      res.send(" Login successfully.....!");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/profile", UserAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/sendConnectionRequest", UserAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstname + " " + user.lastname + " " + " sent the Request");
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
