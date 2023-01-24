const mongoose = require('mongoose');

const connectDB = async() => {
    // await mongoose.connect(process.env.MONGO_URI, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopoogy: true,
    //     useFindAndModify: true
    // });
    

    mongoose.connect(process.env.MONGO_URI,
        err => {
            if(err) throw err;
            console.log('connected to MongoDB')
        });
} 



module.exports = connectDB;