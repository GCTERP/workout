const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/Users');
const sendEmail = require('../utils/sendEmail');


// authenticate user
exports.getuser = async(req, res) => {
    try{
        const cookie = req.cookies['gcterploginjwt'];
        const decoded = jwt.verify(cookie,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials",
                authenticated:false
            })
        }
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({success:false, message:"No user is found with this id", authenticated:false});
        }
        
        res.status(200).json({success:true,authenticated:true,signeduser:user.userType,cookie})
        
    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
    }
    

    
}

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
            return res.status(200).json({userExists:false,passwordExists:false,message:'User does not exists in db'});
            // Which means this email is not registered as a GCTERP Portal user
           
        }
        if(user && user.password){
            // email exist and password is created
            return res.status(200).json({userExists:true,passwordExists:true,message:"User exists and Pw is created"});
            // in this case the user must be redirected to login page
        }
        else{
            // email exist and password is not created
            return res.status(200).json({userExists:true,passwordExists:false,message:'User exists but no password is created'});
            // in this case the user must be redirected to New password creation Page
        }

    } catch (error){
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
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
        const user = await User.findOne({email}).select("+password");
        if(!user){
            // email is not found in database
            return res.status(200).json({pwstatus:'invaliduser',message:"The user with this email is not found in database"})
        }
        if(user && user.password){
            return res.status(200).json({pwstatus:'alreadyexists',message:"You have already created a password"})
        }

        user.password = req.body.password;
        await user.save();
        
        const portalUrl = `http://localhost:3000/auth`;

        //msg that is to be sent to the user mail
        const message = `
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                          
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;">
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            successfully created your GCTERP Portal password
                                        </h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;">
                                        </span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            
                                        click the following link to login to profile
                                        </p>
                                        <a href=${portalUrl}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Continue to login
                                        </a>
                          
                                    </td>
                                </tr>
                                <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            
                                    If you have not created this password, follow the below instructions to recover your account.
                                </p>
                                <ol style="color:#455056; font-size:15px;line-height:24px; margin:0; text-align:left">
                                <li>Go to ERP Portal Login Page and</li>
                                <li>Click on Forgot Password</li>
                                <li>You will receive a mail with reset link</li>
                                <li>Click on the link to reset password</li>
                                <li>Create a strong and secure password for security</li>
                                </ol>
                            </tr>
                                
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
     
                            </table>
                        </td> 
                        <tr><td>
                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                Still your problem is not resolved? Try Contacting Administration support for any queries.
            </p>
                            </td>
                        </tr>
                         
                </table>
            </td>
           
        </tr>
        <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
    </table>
   
</body>`

        try{
            await sendEmail({
                to: user.email,
                subject: "GCTERP Portal Password Creation was successfull",
                text: message
            });

        }catch(error){
            return res.status(200).json({pwstatus:'savedbutmailnotsent',message:"Something is wrong Email couldn't be sent"});
        }

        res.status(200).json({
            pwstatus:true,
            message: "Password has been saved to database and the acknowledgement of the same has been sent to your registered mail"
        });
    
       } catch (error){
        res.status(400).json({pwstatus:false,message:"Something wrong happened",Error:error});
       }
        
    };
// on successfull password generation the user must be redirected to login page(Better for Security)









// LOgin Authentication
exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        // email or password or both is null
        return res.status(400).json({success:false,message:"email or password or both data is not received to backend(Please provide)"})
    }

    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
             // email is not found in database
        return res.status(200).json({success:false,message:"The user with this email is not found in database"})
        }

        const isMatch = await user.comparePassword(password);
        // comparing the password

        if(!isMatch){
             // entered password does not matches the exact db password
        return res.status(200).json({success:false,message:"Password is incorrect"})
        }
        sendToken(user, 200, res);
        //refer the below function

    } catch (error){
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
    }
};

// 2.Cookie method 
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.cookie('gcterploginjwt',token,{
        httpOnly:true,
        maxAge: 60*60*1000 //1hr
    })
    console.log('Cookie created successfully')
    res.status(statusCode).json({success:true,signeduser:user.userType});
}

// token Method:
// const sendToken = (user, statusCode, res) => {
//     const token = user.getSignedToken();
//     //add this token when using postman inside Authorization/type('Bearer')
//     res.status(statusCode).json({success:true,signeduser:user, token});
// }

// Expire JWT token on logout
// Normally the client side stores the token somewhere while using JWT authentication, 
// and attaches it to any request that needs authentication. Thus, the first thing to do when logging out is simply delete the token that you saved on the client (i.e. local storage browser). 
// In that case, the client does not have a token to put in the request, thus causing unauthorized status of response. But still does that be enough? Anyway, the specific client (browser, app) will no longer be authenticated, but the token still exists somewhere, and is still valid! If someone has copied the token from the request he / she would still be able to make requests on the user’s behalf!.

// Actually, JWT serves a different purpose than a session and it is not possible to forcefully delete or invalidate an existing token.
// But its possible in cookies :)

exports.logout = (req,res) => {
    try{
        res.cookie('gcterploginjwt','',{maxAge:0}).status(200).json({success:true,message:"Successfully loggedout"})
    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
    }
}



// Forgot Password Route
exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(200).json({success:falase,message:"Not a Valid User"});
        }
        
        if(user && !user.password){
            return res.status(200).json({success:false,message:"You have not created any password yet"});
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/auth/resetpassword/${resetToken}`;

        //msg that is to be sent to the user mail
        const message = `
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your GCTERP Portal password
                                        </h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;">
                                        </span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${resetUrl}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset My Password
                                        </a>
                                       
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            or Click 
                                        </p>
                                       
                                        <a href=${resetUrl} clicktracking=off>
                                            ${resetUrl}
                                        </a>
                                        
                                        
                                    </td>
                                </tr>
                                <tr>
                        <td>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                The above link will expire after 10 mins
                            </p>
                            </td>
                            <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                            If you did not request a password reset, please ignore this email or contact Administration support for any queries.
                            </p>
                            </table>
                        </td> 
                         
                </table>
            </td>
        </tr>
        <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
    </table>
   
</body>`

        try{
            await sendEmail({
                to: user.email,
                subject: "Your GCTERP Portal Password Reset Request",
                text: message
            });

            res.status(200).json({
                success:true,
                message: "An Email with reset link has been sent successfully"
            });

        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return res.status(400).json({success:false,message:"Something is wrong Email couldn't be sent"});
        }

    } catch (error){
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
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
        res.status(400).json({success:false,message:"Something wrong happened",Error:error});
    }
     
 };
 
 

