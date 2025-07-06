const express = require('express');
const router = express.Router();

const { getMe, updateProfile } = require('../controllers/userController');
console.log("🐛 getMe:", getMe, "| updateProfile:", updateProfile);

const { protect } = require('../middleware/authMiddleware');
console.log("🛡️ protect:", protect);

router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);

module.exports = router;
