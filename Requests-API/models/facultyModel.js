import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
    name : String,
    requests : [{type: mongoose.Schema.Types.ObjectId, ref:"request"}]
})


const facultyModel = mongoose.model("faculty",facultySchema);

export default facultyModel;