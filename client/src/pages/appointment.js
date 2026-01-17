import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

export default function AppointmentModal({ isOpen, onClose, doctor }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointment ,setAppointments]=useState(null);
  const slots = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","12:00","12:30",
    "14:00","14:30","15:00","15:30",
    "16:00","16:30"
  ];
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1890ff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px",
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
};

  const bookAppointment = async () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }

    try {
      console.log("calling this /api/doctor/book-appointment route")
      const res = await axios.post(
        "/api/doctor/bookappointment",
        {
          doctorId: doctor._id,
          date,
          time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert(res.data.message);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error booking appointment");
    }
  };

  return (
   <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
    },
    content: {
      inset: "unset",
      width: "360px",
      borderRadius: "10px",
      padding: "20px",
    },
  }}
>

     <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
  Book Appointment
</h2>

<p style={{ textAlign: "center", color: "#555" }}>
  Dr. {doctor?.firstName} {doctor?.lastName}
</p>

<label>Date</label>
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  style={inputStyle}
/>

<label>Time</label>
<select
  value={time}
  onChange={(e) => setTime(e.target.value)}
  style={inputStyle}
>

  <option value="">Select Time</option>
  {slots.map((slot) => (
    <option key={slot} value={slot}>
      {slot}
    </option>
  ))}
</select>

<button style={primaryBtn} onClick={bookAppointment}>
  Confirm Booking
</button>

<button style={secondaryBtn} onClick={onClose}>
  Cancel
</button>


    </Modal>
  );
}
