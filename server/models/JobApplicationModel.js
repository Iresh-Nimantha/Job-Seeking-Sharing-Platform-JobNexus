const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,

    required: true,
    ref: "User",
    required: true,
  },
  jobId: { type: String, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  coverLetter: { type: String, required: true },
  cvFilePath: { type: String, required: true }, // Path to uploaded CV
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  jobEmail: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
