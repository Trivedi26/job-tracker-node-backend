const User = require('../models/User');

// @desc    Get current logged-in user's profile
// @route   GET /api/job-tracker/user/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/job-tracker/user/update-profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            email: req.body.email, // ✅ Allow email update
            phone: req.body.phone,
            location: req.body.location,
            bio: req.body.bio,
        };

        const user = await User.findByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        // ✅ Handle duplicate email error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Profile update failed', error: error.message });
    }
};

module.exports = {
    getMe,
    updateProfile,
};
