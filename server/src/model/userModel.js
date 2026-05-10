import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
    trim: true,
  },

  email: {
    type: "String",
    required: true,
    trim: true,
  },

  contact: {
    type: Number,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
