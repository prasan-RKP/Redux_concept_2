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

  carts: [
    {
      uid: {
        type: Number,
        required: true,
      },

      desc: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
