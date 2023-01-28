import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    id : Number,
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref:"student", require: true},
    type : String,
    description : String,
    time : Date,
    reportTo : {type: mongoose.Schema.Types.ObjectId, ref:"faculty", require: true},
    approved : Boolean
});

const requestModel = mongoose.model("request",requestSchema);

export default requestModel;