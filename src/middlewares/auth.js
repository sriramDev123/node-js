const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserAuth = async (req, res, next) => {
  try {
    //reading tokemn from req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token Invalid........!");
    }
    //validate the token
    const decodedMessage = jwt.verify(token, "DEV@Tinder$790");
    //find the user
    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
};

module.exports = {
  UserAuth,
};
