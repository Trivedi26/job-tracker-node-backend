const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user);
        res.status(201).json({ user: { id: user._id, name, role }, token });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
};

// @login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.status(200).json({ user: { id: user._id, name: user.name, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};
