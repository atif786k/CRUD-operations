const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  displayName: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
