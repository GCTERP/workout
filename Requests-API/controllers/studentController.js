import studentModel from "../models/studentModel.js";
import requestModel from "../models/requestsModel.js";
import facultyModel from "../models/facultyModel.js";


const studentController = {
    getAllRequests : async (req,res)=>{
        const allRequests = await studentModel.find({rollno:req.body.rollno}).populate("requests");
        res.json(allRequests);
    },
    /**
     * 
     * @param {studentName,facultyName,id,type,description} req 
     * @param {*} res 
     */
    createRequest : async(req,res)=>{
        const student = await studentModel.findOne({name:req.body.studentName});
        const faculty = await facultyModel.findOne({name:req.body.facultyName});
        console.log(student,faculty);
        const newRequest = new requestModel(
            {
                id : req.body.id,
                createdBy : student._id,
                type : req.body.type,
                description : req.body.description,
                time : new Date(),
                reportTo : faculty._id,
                approved : false
            }
        );


        const result = await newRequest.save();
        student.requests.push(result);
        faculty.requests.push(result);
        res.json(result);
    }
}


export default studentController;