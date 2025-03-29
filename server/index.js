const express = require("express");
const jobVacancyRoute = require("./routes/jobVacancyRoute");
const userRoute = require("./routes/userRoute");
const jobApplicationRoute = require("./routes/jobApplicationRoutes"); // Import job application routes

const connectDB = require("./config/DBConnection");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging Middleware (useful for debugging requests)
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Routes
app.use("/api/jobVacancy", jobVacancyRoute); // Route for job vacancies
app.use("/api/user", userRoute); // Route for user-related endpoints

// ✅ Routes JobApplication
app.use("/api/applications", jobApplicationRoute);

// ✅ Serve CV Files JobApplication
//app.use("/uploads/cvs", express.static(path.join(__dirname, "uploads/cvs")));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Server Setup
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
