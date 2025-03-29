//user deatils
const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accountType:{
    type: String,
    enum:["Owner", "Admin", "User"],
    required:true
  }
});

const userModel = mongoose.model("users", user);

module.exports = { userModel };
