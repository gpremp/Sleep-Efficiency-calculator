const { User } = require("../../models/User.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number(10));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword })
      .save()
      .then((result) => {
        res.status(201).send({ message: "User created successfully" });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.send({ message: "User Name Already exits" });
        } else {
          res.status(500).send({ message: "Internal Server Error" });
        }
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const authUser = async (req, res) => {
  try {
    const userResult = await User.findOne({ userName: req.body.userName });
    if (!userResult)
      return res.send({ message: "Invalid User Name or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      userResult.password
    );
    if (!validPassword) {
      return res.send({ message: "Invalid User Name or Password" });
    }
    const token = userResult.generateAuthToken();
    let user = userResult.toObject();
    delete user.password;
    user.token = token;
    res.send({ user: user, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { createUser, authUser };
