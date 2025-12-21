const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ramdev:k414ZU0mhjJsL21x@ramnode.4lzzgkb.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDB,
};
