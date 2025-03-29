const express = require("express");
const JobVacancyModel = require("../models/JobVacancyModels");
const userModel = require("../models/userModels");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Get all job vacancies
const getJobVacancies = async (req, res) => {
  try {
    const jobs = await JobVacancyModel.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get job vacancy by ID
const getJobByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid job ID" });
  }
  try {
    const job = await JobVacancyModel.findById(id);
    if (!job) {
      return res.status(400).json({ msg: "No job found with that ID." });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a job vacancy
const createJobVacancy = async (req, res) => {
  const {
    jobTitle,
    jobType,
    location,
    salary,
    requiredSkills,
    jobDescription,
    companyName,
    industryType,
    companyWebsite,
    contactPerson,
    email,
    applicationDeadline,
    applyMethod,
  } = req.body;

  if (
    !jobTitle ||
    !jobType ||
    !location ||
    !salary ||
    !requiredSkills ||
    !jobDescription ||
    !companyName ||
    !industryType ||
    !contactPerson ||
    !email ||
    !applicationDeadline ||
    !applyMethod
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
  if (!token) {
    return res.status(401).json({ error: "Authentication token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    // Verify that the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Create the job vacancy
    const job = await JobVacancyModel.create({
      userId: userId,
      jobTitle,
      jobType,
      location,
      salary,
      requiredSkills,
      jobDescription,
      companyName,
      industryType,
      companyWebsite,
      contactPerson,
      email,
      applicationDeadline,
      applyMethod,
    });

    res.status(200).json({ job, userId });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a job vacancy
const deleteJobVacancy = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid job ID" });
  }

  try {
    const job = await JobVacancyModel.findByIdAndDelete(id);
    if (!job) {
      return res.status(400).json({ msg: "No job found to delete." });
    }
    res.status(200).json({ message: `${id} deleted successfully` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a job vacancy
const updateJobVacancy = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid job ID" });
  }

  try {
    const job = await JobVacancyModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(400).json({ msg: "No job found to update." });
    }
    res.status(200).json({ message: `${id} updated successfully`, job });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Test route
const test = async (req, res) => {
  res.status(200).json({ msg: "Test passed" });
};

module.exports = {
  createJobVacancy,
  getJobVacancies,
  getJobByID,
  deleteJobVacancy,
  updateJobVacancy,
  test,
};
