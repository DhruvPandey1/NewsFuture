const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  console.log(req.body)
  const { name ,email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username:name, password: hashedPassword, email:email });
  res.json({ token: generateToken(user.id) });
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { username:name } });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
