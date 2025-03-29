const express = require("express");
const {
  submitApplication,
  getApplications,
  getApplicationById,
} = require("../controllers/jobApplicationController");
const protect = require("../middlewares/authMiddlewares");
const multer = require("multer");

const router = express.Router();

// ✅ Configure Multer for CV Upload
const storage = multer.diskStorage({
  destination: "./uploads/cvs/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/apply", upload.single("cv"), submitApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);

module.exports = router;
