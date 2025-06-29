const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: String,
    company: String,
    status: {
        type: String,
        enum: ["Applied", "Interview", "Offer", "Rejected"],
        default: "Applied",
    },
    appliedDate: Date,
    notes: String,
});

module.exports = mongoose.model("Job", jobSchema);
