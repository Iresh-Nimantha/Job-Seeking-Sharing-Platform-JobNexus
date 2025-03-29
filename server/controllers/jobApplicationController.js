const JobApplication = require("../models/JobApplicationModel");

// ✅ Submit Job Application
const submitApplication = async (req, res) => {
  try {
    const {
      userId,
      jobId,
      name,
      email,
      coverLetter,
      jobTitle,
      companyName,
      jobEmail,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "CV file is required!" });
    }

    const newApplication = new JobApplication({
      userId,
      jobId,
      name,
      email,
      coverLetter,
      cvFilePath: `/uploads/cvs/${req.file.filename}`,
      jobTitle,
      companyName,
      jobEmail,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Applications
const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate("userId jobId");
    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get Application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id).populate(
      "userId jobId"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error("❌ Error fetching application:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { submitApplication, getApplications, getApplicationById };
