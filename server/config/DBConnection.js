const express = require("express");
const mongoose = require("mongoose");

// Correcting the async function declaration
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB NOT Connected", err);
  }
};

module.exports = connectDB;
