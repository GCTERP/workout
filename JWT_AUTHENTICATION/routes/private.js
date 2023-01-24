const express = require('express');
const router = express.Router();
const {getPrivateDashboardData} = require('../controllers/dashboard');
const {protect} = require('../middleware/auth');

// it is must because it only provides authentication
router.use(protect);

// router.route("/").get(protect, getPrivateData);
router.route('/dashboard').get(getPrivateDashboardData);



module.exports = router;