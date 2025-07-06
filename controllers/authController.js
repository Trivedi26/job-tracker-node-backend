const jwt = require("jsonwebtoken");
const User = require("../models/User");
console.log("🧩 Imported User model:", User);

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user);

        res.status(201).json({
            user: { id: user._id, name, role },
            token,
        });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Registration failed", error });
    }
};

// @login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("📩 Login attempt");
        console.log("🔎 Email:", email);
        console.log("🔑 Password:", password);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            console.log("❌ Incorrect password for user:", user.email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        console.log("✅ Login successful for:", user.email);
        res.status(200).json({
            user: { id: user._id, name: user.name, role: user.role },
            token,
        });
    } catch (error) {
        console.error("💥 Login error:", error);
        res.status(500).json({ message: "Login failed", error });
    }
};

// @updateProfile
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        console.error("❌ Error updating profile:", error.message);
        res.status(500).json({ message: "Profile update failed", error: error.message });
    }
};
