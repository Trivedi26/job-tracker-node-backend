const Job = require("../models/job");

const getAllJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await Job.find({ user: userId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch jobs", error });
    }
};

const createJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const newJob = new Job({ ...req.body, user: userId });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: "Failed to create job", error });
    }
};

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Failed to Update job", error });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete job", error });
    }
};

module.exports = {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
};

