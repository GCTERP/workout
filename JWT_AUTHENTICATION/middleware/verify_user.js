const jwt = require('jsonwebtoken');
const User = require('../models/Users');



exports.protect = async (req, res, next) => {
    // 1.token verification - 
    // let token;

    // if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    //     token = req.headers.authorization.split(" ")[1]
        
    // }

    // 2.Cookie verification-
    const cookie = req.cookies['gcterploginjwt'];
    
    try{
        // const decoded =jwt.verify(token, process.env.JWT_SECRET)
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
        req.user = user;
        
        next();

    } catch(error) {
        res.status(400).send('Invalid Cookie');
    }
    
    // let token;

    // if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    //     token = req.headers.authorization.split(" ")[1]
        
    // }

    // if(token === 'null' || !token){
    //     return res.status(401).json({message:"No token available or Invalid Token"});
    // }

    // try{
    //     const decoded =jwt.verify(token, process.env.JWT_SECRET)

    //     const user = await User.findById(decoded.id);

    //     if(!user){
    //         return res.status(404).json({message:"No user is found with this id"});
    //     }

    //     req.user = user;
    //     next();
    // } catch(error) {
    //     res.status(400).send('Invalid Token');
    // }
}


// Restricting access users
// Verify if the user is admin
exports.IsAdmin = async(req, res, next) => {
    if(req.user.userType != 'admin'){
        res.status(403).json({message:"Permission Denied: You don't have access to authorize this route"})
        // res.status(200).json({message:"user as admin is verified",IsAdmin:true})
    }else{
        next();
    }
    return;
}

// Verify if the user is student
exports.IsStudent = async(req, res, next) => {
    if(req.user.userType != 'student'){
        res.status(403).json({message:"Permission Denied: You don't have access to authorize this route"})
        // res.status(200).json({message:"user as admin is verified",IsAdmin:true})
        
    }else{
        next();
    }
    return;
}

// Like this add all the users


