const  mongoose = require("mongoose");
const doctorSchema= new mongoose.Schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, //  change from String
    ref: "users",
    required: true,
},
firstName:{
    type:String,
    required:true,
},
lastName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
phoneNumber:{
    type:String,
    required:true,
},
website:{
    type:String,
    required:true,
},
address:{
    type:String,
    required:true,
},
specialization:{
type:String,
required:true,
},
experience:{
    type:String,
    required:true,
},
feePerConsultation:{
    type:Number,
    required:true,
},
 timings: {
    start: String, // "09:00"
    end: String,   // "17:00"
  },

  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

const doctorModel=mongoose.model("doctor",doctorSchema);
module.exports=doctorModel;