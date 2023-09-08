const User = require("../models/userSchema.js");
const bcrypt = require("bcryptjs"); // Import bcryptjs library
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const tokenId = uuidv4();
        const tokenExpiry = remember ? "30d" : "2d";
        const token = jwt.sign(
          { email: user.email, tokenId: tokenId },
          process.env.JWT_SECRET,
          {
            expiresIn: tokenExpiry,
          }
        );
        const cookieOptions = {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: false,
        };
        res.cookie("token", token, cookieOptions);
        res.json(user);
      } else {
        res.json({ message: "Invalid Credentials" }); // Password is invalid
      }
    } else {
      res.json({ message: "Invalid Credentials" }); // User not found
    }
  } catch (err) {
    res.json({ message: "Internal Server Error" }); // Handle other errors
  }
};

exports.login = login;
