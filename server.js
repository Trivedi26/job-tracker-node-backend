const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
    origin: ["http://localhost:3000", "https://abode-next-42hw0wzkj-trivedi26s-projects.vercel.app/"],
    credentials: true,
}));
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/job-tracker/auth", authRoutes);
app.use("/api/job-tracker/jobs", jobRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: "job-tracker",
})
    .then(() => {
        console.log("✅ Connected to MongoDB");
        console.log("🧠 Using DB:", mongoose.connection.name);
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
    });
