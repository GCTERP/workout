const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6
        // ,
        // select:false
        //when we are selected from database do we need to show password also
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});


UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};


UserSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});
};

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    this.resetPasswordExpire = Date.now() + 10 * (60*1000);
    // 10mins
    
    return resetToken;

};


const User = mongoose.model("User", UserSchema);

module.exports = User;