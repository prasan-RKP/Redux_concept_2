import express from "express";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../lib/webToken.js";
import { protectedRoute } from "../middleware/middleware.js";

const router = express.Router();

router.get("/hello", (req, res) => {
  console.log("🔥 HELLO HIT");
  res.send("Hello route hit!");
});

router.get("/me", protectedRoute, async (req, res) => {
  res.status(200).json(req.user); // ✅ use req.user, no extra DB call needed
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill your all credentials" });
  }

  try {
    // step -1: find user-Detail via email
    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser)
      return res.status(400).json({ message: "User not registered" });

    // step - 2: check password is correct or not
    const isCorrectPass = await bcryptjs.compare(
      password,
      loggedInUser.password,
    );
    if (!isCorrectPass)
      return res.status(400).json({ message: "Wrong Credentials" });

    // step - 3: store token
    createToken(loggedInUser._id, res);

    // step -4: return respose

    return res.status(200).json({
      username: loggedInUser.username,
      email: loggedInUser.email,
      contact: loggedInUser.contact,
    });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, contact, password } = req.body;

  if (!username || !email || !contact || !password)
    return res.status(400).json({ message: "Please fill all credentials" });

  try {
    // step-1 : check is user-already registered or not
    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User already registered" });

    // step - 2: make the password to hashedPassword
    const hashedPassword = await bcryptjs.hash(password, 10);

    // step - 3: create new data for the user
    const newUser = new User({
      username,
      email,
      contact,
      password: hashedPassword,
    });

    // step - 4: create token
    createToken(newUser._id, res);

    // step -5: save it
    await newUser.save();

    // step-6: return response
    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      contact: newUser.contact,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout Successfully ✅" });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.post("/addToCart", protectedRoute, async (req, res) => {
  const { uid, desc, img, price, qty } = req.body;

  if (!uid || !desc || !img || !price || !qty) {
    return res.status(400).json({ message: "Product Not Found !" });
  }

  try {
    let userId = req.user?._id;
    if (!userId) return res.status(400).json({ message: "UnAuthorized User" });
    let loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // step - 2 (if the item already exists or not)
    const existingIndex = loggedInUser.carts.findIndex(
      (item) => item.uid === Number(uid),
    );

    // step - 3 (if already exist return error or push and store )
    if (existingIndex !== -1) {
      return res.status(400).json({ message: "Product already in cart 🛍️" });
    }

    // Add to cart
    loggedInUser.carts.push({
      uid: Number(uid),
      image: img,
      quantity: 1,
      price: Number(price),
      desc: desc.trim(),
    });

    await loggedInUser.save();
    return res
      .status(200)
      .json({ message: "Product Added To Cart 🛒", carts: loggedInUser.carts });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

router.get("/cart", protectedRoute, async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      carts: loggedInUser.carts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
