const User = require("../models/user");

const jwt = require("jsonwebtoken");

const expressjwt = require("express-jwt");

require("dotenv").config();

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  const usernameTaken = await User.findOne({ username: req.body.username });

  const userPass = req.body.password;

  if (userExists) {
    return res.status(403).json({
      error: "Email is already used!",
    });
  }

  if (usernameTaken) {
    return res.status(403).json({
      error: "Username is already taken!",
    });
  }

  if (userPass.length < 6) {
    return res.status(403).json({
      error: "Password must be more then 6 character ",
    });
  }

  const user = await new User(req.body);

  await user.save();

  res.status(200).json({ message: "User Registerd" });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password Does not matched",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;

    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");

  return res.json({ message: "Logout Successfully" });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,

  userProperty: "auth",
});
