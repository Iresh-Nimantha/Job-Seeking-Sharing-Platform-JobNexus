const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const JobVacancyModel = require("./JobVacancyModels"); // Import job vacancy model

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,

      // validate: {
      //   validator: (value) => validator.isMobilePhone(value, "any"),
      //   message: "Invalid phone number",
      // },
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  phone,
  address,
  city,
  country
) {
  if (!username || !email || !password) {
    throw Error("Each field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password should be strong");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    phone,
    address,
    city,
    country,
  });
  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Each field must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email is incorrect..!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password is incorrect..!");
  }

  return user;
};
// pwd = Ema@1234
// Static deleteUser method
userSchema.statics.deleteUser = async function (userId) {
  if (!userId) {
    throw Error("User ID must be provided");
  }

  // Check if the user exists
  const user = await this.findById(userId);
  if (!user) {
    throw Error("User not found");
  }

  // Find and delete all job vacancies related to the user
  const jobVacancies = await JobVacancyModel.find({ user: userId });
  if (jobVacancies.length > 0) {
    await JobVacancyModel.deleteMany({ user: userId });
  }

  // Delete the user
  await this.deleteOne({ _id: userId });

  return "User and related job vacancies deleted successfully";
};

module.exports = mongoose.model("User", userSchema);
