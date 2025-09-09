const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  console.log(req.body)
  const { username ,email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, email });
  res.json({ token: generateToken(user.id) });
};

exports.loginUser = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
