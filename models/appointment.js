const  mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  date: {
    type: String, // "2025-12-15"
    required: true,
  },
  time: {
    type: String, // "10:30"
    required: true,
  },
  status: {
    type: String,
    default: "booked", // booked | cancelled | completed
  },
}, { timestamps: true });

const appointmentModel=mongoose.model("doctorAppointment",appointmentSchema);
module.exports=appointmentModel;