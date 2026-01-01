const validator = require("validator");

const validateSignupData = (req) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error("First name and Last name are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email address: " + email);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = {
  validateSignupData,
};
