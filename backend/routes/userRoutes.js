const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/users");

// POST /api/v1/user/signup
router.post(
  "/signup",
  [
    // Validate and sanitize fields
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      res.status(201).json({
        message: "User created successfully.",
        user_id: newUser._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating user!",
        error: error.message,
      });
    }
  }
);

// POST /api/v1/user/login
router.post(
  "/login",
  [
    // Validate and sanitize fields
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User does not exist with this email!" });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: "Incorrect password!" });
      }

      return res.status(200).json({
        message: "Login successful.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error!" });
    }
  }
);

module.exports = router;
