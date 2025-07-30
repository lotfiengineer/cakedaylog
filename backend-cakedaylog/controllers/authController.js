const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser)
      return res.status(400).json({
        message: "Email already exists",
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "User with this email doesn't exist",
      });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Password is incorrect",
      });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return res.status(400).json({
        message: "User with this email doesn't exist",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    foundUser.password = hashedPassword;
    await foundUser.save();

    res.status(202).json({
      message: "User password changed",
      user: foundUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  resetPassword,
};
