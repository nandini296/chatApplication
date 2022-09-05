const User = require("../model/userModel");

const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userCheck = await User.findOne({ username });

    console.log(userCheck);

    if (userCheck) {
      return res.json({ msg: "Username already used!", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used!", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return res.json({ msg: "Invalid Credentials!", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Invalid Credentials!" });
    }

    delete checkUser.password;

    return res.json({ status: true, checkUser });
  } catch (err) {
    next(err);
  }
};
