const express = require("express");
const router = express.Router();

const { protect, employerOnly } = require("../middleware/authMiddleware");

const {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

router.get("/", protect, getAllJobs); // All users can view jobs

// ✅ Only employer can perform these
router.post("/", protect, employerOnly, createJob);
router.put("/:id", protect, employerOnly, updateJob);
router.delete("/:id", protect, employerOnly, deleteJob);

module.exports = router;
