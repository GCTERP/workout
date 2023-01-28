import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name : String,
    rollno : Number,
    requests: [{type: mongoose.Schema.Types.ObjectId, ref:"request"}]
});

const studentModel = mongoose.model("student", studentSchema);

export default studentModel;