import userModel from "../models/userModel.js";

import Auth from "../common/Auth.js";

const create = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) {
      password = await Auth.hashpassword(password);
      await userModel.create({ name, email, password });

      res.status(200).send({
        message: "User Created Successfully",
      });
    } else {
      res.status(400).send({
        message: `User with ${email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }

    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(403).send({ message: "User not found" });
    }

    const isPasswordValid = await Auth.hashcompare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      let token = await Auth.createToken({
        email,
        id: user._id,
      });

      return res.status(200).send({
        message: "Login Successful",
        token,
        name: user.name,
        userid: user._id,
      });
    } else {
      return res.status(400).send({
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default { create, login };
