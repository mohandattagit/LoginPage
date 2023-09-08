const User = require("../models/userSchema.js");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.find({ email: email });
    if (user.length > 0) {
      res.json({ message: "User already exists" });
    } else {
      user = await User.create({ name, email, password });
      res.json(user);
    }
  } catch (err) {
    res.json(err);
  }
};
exports.signup = signup;
