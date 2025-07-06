const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

router.get("/", protect, getAllJobs);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
