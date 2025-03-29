const express = require("express");
const { mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const jobVacancySchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Freelance", "Internship"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String, // Can be a string like "Negotiable" or a numeric range
      required: true,
    },
    requiredSkills: {
      type: [String], // Array of skills
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    industryType: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    applyMethod: {
      type: String, // "Upload CV", "Apply via Email", "External Link"
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobVacancy", jobVacancySchema);
