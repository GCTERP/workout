const express = require('express');

const router = express.Router();


const { 
    registerPassword, 
    checkmailexistance,
    login, 
    forgotpassword, 
    resetpassword,
    getuser,
    logout
} = require("../controllers/auth");


router.route("/getuser").get(getuser);
router.route("/").post(checkmailexistance);
router.route("/registerpassword").post(registerPassword);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);





module.exports = router;