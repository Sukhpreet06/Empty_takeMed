import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import './myappointment.css'
import { useSelector } from "react-redux";
export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  console.log("user---",user);
const getAppointments = async () => {
    try {
      const res = await axios.get("/api/users/user-appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
useEffect(()=>{
  console.log(appointments);
  console.log(".length",appointments.length);
},[appointments]);
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>
        {user?.isDoctor ? "Doctor Appointments" : "My Appointments"}
      </h2>

      <div className="myappointments-container">
        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="myappointment-list">
            {appointments.map((appt) => (
              <div key={appt._id} className="myappointment-card">

                {/* USER VIEW */}
                {!user?.isDoctor && (
                  <>
                    <h4>
                      Dr. {appt.doctorId?.firstName}{" "}
                      {appt.doctorId?.lastName}
                    </h4>

                    <p>
                      <strong>Specialization:</strong>{" "}
                      {appt.doctorId?.specialization}
                    </p>
                  </>
                )}

                {/* DOCTOR VIEW */}
                {user?.isDoctor && (
                  <>
                    <h4>
                      Patient: {appt.userId?.name}
                    </h4>

                    <p>
                      <strong>Email:</strong>{" "}
                      {appt.userId?.email}
                    </p>
                  </>
                )}

                <p>
                  <strong>Date:</strong> {appt.date}
                </p>

                <p>
                  <strong>Time:</strong> {appt.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`mystatus ${appt.status}`}>
                    {appt.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}