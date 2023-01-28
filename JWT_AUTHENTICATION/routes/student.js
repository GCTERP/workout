const express = require('express');
const router = express.Router();
const {getStudentDashboardData} = require('../controllers/studentdashboard');
const {protect, IsStudent} = require('../middleware/verify_user');

// it is must because it only provides authentication
router.use(protect, IsStudent);

// router.route("/").get(protect, getPrivateData);
router.route("/").get(getStudentDashboardData);



module.exports = router;