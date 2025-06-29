const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


const {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

router.get("/", authMiddleware, getAllJobs);
router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
