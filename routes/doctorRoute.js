const express = require("express");
const Doctor = require("../models/doctorModel");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddelware");
const AppointmentModal= require( "../models/appointment");

router.post('/get-doctor-info-by-user-id', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });

        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Doctor Info fetched Successfully",
            data: doctor,
        });

    } catch (error) {
        res.status(500).send({
            message: "Error getting Doctor Info",
            success: false,
            error: error.message,
        });
    }
});
router.post('/update-doctor-profile', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId },req.body);
            res.status(200).send({
            success: true,
            message: "Doctor Profile Updated Successfully",
            data: doctor,
        });

    } catch (error) {
        res.status(500).send({
            message: "Error getting Doctor Inf",
            success: false,
            error: error.message,
        });
    }
});
router.get("/all", async (req, res) => {
  try {
     console.log("inside /all route");
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.post("/bookappointment", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const isBooked = await AppointmentModal.findOne({
      doctorId,
      date,
      time,
      status: "booked",
    });

    if (isBooked) {
      return res.status(400).send({
        success: false,
        message: "Doctor is not available at this time",
      });
    }

    const appointment = new AppointmentModal({
      userId:  req.body.userId, // from JWT
      doctorId,
      date,
      time,
    });

    await appointment.save();

    res.send({
      success: true,
      message: "Appointment booked successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.send({ success: true, doctor });
});


module.exports = router;
