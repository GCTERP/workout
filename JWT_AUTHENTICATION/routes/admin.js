const express = require('express');
const router = express.Router();
const {getadminDashboardData} = require('../controllers/admindashboard');
const {protect, IsAdmin} = require('../middleware/verify_user');

// it is must because it only provides authentication
router.use(protect, IsAdmin);
// router.use(IsAdmin);

// router.route("/").get(protect, getPrivateData);
router.route("/").get(getadminDashboardData);



module.exports = router;