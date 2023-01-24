const crypto = require('crypto');
const User = require('../models/Users');
const sendEmail = require('../utils/sendEmail');



    // 0 - Enters Email (initial)
    // 1 - Email does not exist
    // 2 - Inactive user
    // 3 - Password does not exist
    // 4 - Password exists

// checking the existance of email and its status
exports.checkmailexistance = async (req, res, next) => {
    const {email} = req.body;

    if(!email){
        // email is null or empty
        return res.status(400).json({message:"email data is not received to backend(Please provide)"})

    }

    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
            // email doesnot exist as user
            // return next(new ErrorResponse("Email doesnot exists", 401));
            return res.status(404).send('User does not exists in db');
            // Which means this email is not registered as a GCTERP Portal user
           
        }
        if(user && !user.password){
            // email exist and password is not created
            return res.send('User exists but no password is created');
            // in this case the user must be redirected to New password creation Page
        }
        else{
            // email exist and password is created
            return res.status(200).send("User exists and Pw is created");
            // in this case the user must be redirected to login page
        }

    } catch (error){
        next(error);
    }
};

// registerPassword - Creating password for the first time
exports.registerPassword = async (req, res, next) => {
    const {email} = req.body;
    if(!email){
        // email is null or empty
        return res.status(400).json({message:"email data is not received to backend(Please provide)"})
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            // email is not found in database
        return res.status(400).json({message:"The user with this email is not found in database"})
        }
        user.password = req.body.password;
        await user.save();
        res.status(201).json({
            success:true,
            message: "Password added to the database successfully"
        });
    
       } catch (error){
        next(error);
       }
        
    };
// on successfull password generation the user must be redirected to login page(Better for Security)



// LOgin Authentication
exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        // email or password or both is null
        return res.status(400).json({message:"email or password or both data is not received to backend(Please provide)"})
    }

    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
             // email is not found in database
        return res.status(400).json({message:"The user with this email is not found in database"})
        }

        const isMatch = await user.comparePassword(password);
        // comparing the password

        if(!isMatch){
             // entered password does not matches the exact db password
        return res.status(400).json({message:"Password is incorrect"})
        }
        sendToken(user, 200, res);
        //refer the below function

    } catch (error){
        next(error)
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    //add this token when using postman inside Authorization/type('Bearer')
    res.status(statusCode).json({success:true,signeduser:user, token});
}


// Expire JWT token on logout
// Normally the client side stores the token somewhere while using JWT authentication, 
// and attaches it to any request that needs authentication. Thus, the first thing to do when logging out is simply delete the token that you saved on the client (i.e. local storage browser). 
// In that case, the client does not have a token to put in the request, thus causing unauthorized status of response. But still does that be enough? Anyway, the specific client (browser, app) will no longer be authenticated, but the token still exists somewhere, and is still valid! If someone has copied the token from the request he / she would still be able to make requests on the user’s behalf!.

// Actually, JWT serves a different purpose than a session and it is not possible to forcefully delete or invalidate an existing token.




// Forgot Password Route
exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Not a Valid User"});
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        //msg that is to be sent to the user mail
        const message = `
        <h1> You have requested a new password reset</h1>
        <p>Please click the below link to reset your password</P>

        <a href=${resetUrl} clicktracking=off>
        ${resetUrl}</a><br>
        <p>The Above link will expire after 10mins</p>
        `

        try{
            await sendEmail({
                to: user.email,
                subject: "Your Password Reset Request",
                text: message
            });

            res.status(200).json({
                success:true,
                message: "Email has been sent successfully"
            });

        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return res.status(400).json({success:false,message:"Something is wrong Email couldn't be sent"});
        }

    } catch (error){
        next(error);
    }
    
};


  
// reset Password
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
     const user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpire: {$gt: Date.now()}
     });
 
     if(!user){
         return res.status(400).json({success:false,message:"Invalid Reset link(Token)"});
     }
 
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
 
     await user.save();
     res.status(201).json({
         success:true,
         message: "Password Reset Successful"
     });
 
    } catch (error){
     next(error);
    }
     
 };
 
 