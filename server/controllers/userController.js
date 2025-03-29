const userModle = require("../models/userModels");
//const JobVacancyModel = require("../modles/JobVacancyModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//createToken function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//userdetails
const userdetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModle.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModle.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ message: `Login success for ${email}`, token });
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

//signup
const signupUser = async (req, res) => {
  const { username, email, password, phone, address, city, country } = req.body;
  try {
    const user = await userModle.signup(
      username,
      email,
      password,
      phone,
      address,
      city,
      country
    );
    const token = createToken(user._id);
    res
      .status(201)
      .json({ message: "User created successfully", email, token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the request parameters

    // Call the deleteUser method from the user model
    const result = await userModle.deleteUser(userId);

    // Send a success response
    res.status(200).json({
      message: result, // This message is returned from the deleteUser method
    });
  } catch (error) {
    // Handle errors (user not found, no workouts, etc.)
    res.status(400).json({
      error: error.message,
    });
  }
};
const userUpdate = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid job ID" });
  }

  try {
    const result = await userModle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(400).json({ msg: "No job found to update." });
    }
    res.status(200).json({ message: `${id} updated successfully`, result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  userdetails,
  deleteUserController,
  userUpdate,
};
