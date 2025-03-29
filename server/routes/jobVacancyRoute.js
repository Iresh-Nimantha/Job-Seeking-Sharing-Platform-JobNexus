const express = require("express");
const {
  createJobVacancy,
  getJobVacancies,
  getJobByID,
  deleteJobVacancy,
  updateJobVacancy,
  test,
} = require("../controllers/jobVacancyController");

const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares");

// Test route
router.get("/test", test);

// GET all job vacancies
router.get("/", getJobVacancies);

// GET a single job vacancy by ID
router.get("/:id", getJobByID);

// POST a new job vacancy (requires authentication)
router.post("/", createJobVacancy);

// DELETE a job vacancy by ID
router.delete("/:id", deleteJobVacancy);

// UPDATE a job vacancy by ID
router.patch("/:id", updateJobVacancy);

module.exports = router;
