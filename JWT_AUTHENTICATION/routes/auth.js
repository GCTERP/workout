const express = require('express');

const router = express.Router();

const { 
    registerPassword, 
    checkmailexistance,
    login, 
    forgotpassword, 
    resetpassword,
} = require("../controllers/auth");

router.route("/").get(checkmailexistance);
router.route("/registerpassword").post(registerPassword);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);





module.exports = router;