import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import './profile.css';
import { useSelector } from "react-redux";
export default function UserProfile() {
  // const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  // const getProfile = async () => {
  //   const res = await axios.get("/api/users/profile", { headers });
  //   setUser(res.data.user);
  // };

  const getAppointments = async () => {
    const res = await axios.get(
      "/api/users/user-appointments",
      { headers }
    );
    setAppointments(res.data.data);
  };

  const cancelAppointment = async (appointmentId) => {
  try {
    await axios.post(
      "/api/users/cancel-appointment",
      { appointmentId },
      {headers}
    );

    setAppointments((prev) =>
      prev.map((appt) =>
        appt._id === appointmentId
          ? { ...appt, status: "cancelled" }
          : appt
      )
    );
  } catch (error) {
    alert("Cancel failed");
  }
};


  useEffect(() => {
    // getProfile();
    getAppointments();
  }, []);

  return (
  <Layout>
    <div className="profile-container">

      {/* PROFILE CARD */}
      {user && (
        <div className="profile-card">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>

          <div className="profile-info">
            <span>
              <strong>Role:</strong>{" "}
              {user.isAdmin
                ? "Admin"
                : user.isDoctor
                ? "Doctor"
                : "User"}
            </span>

            <span>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </span>

            <span>
              <strong>Total Appointments:</strong>{" "}
              {appointments.length}
            </span>
          </div>
        </div>
      )}

      {/* APPOINTMENTS */}
      <div className="appointments-section">
        <h3>
          {user?.isDoctor
            ? "Appointments Booked For You"
            : "My Appointments"}
        </h3>

        {appointments.length === 0 ? (
          <p className="empty">No appointments found.</p>
        ) : (
          appointments.map((appt) => (
            <div className="appointment-card" key={appt._id}>

              {/* USER VIEW */}
              {!user?.isDoctor && (
                <div>
                  <h4>
                    Dr. {appt.doctorId.firstName}{" "}
                    {appt.doctorId.lastName}
                  </h4>
                  <p>{appt.doctorId.specialization}</p>
                </div>
              )}

              {/* DOCTOR VIEW */}
              {user?.isDoctor && (
                <div>
                  <h4>
                    Patient: {appt.userId.name}
                  </h4>
                  <p>{appt.userId.email}</p>
                </div>
              )}

              <div className="appointment-meta">
                <span>{appt.date}</span>
                <span>{appt.time}</span>
                <span className={`status ${appt.status}`}>
                  {appt.status}
                </span>
              </div>

              {/* USER CAN CANCEL */}
              {!user?.isDoctor && appt.status === "booked" && (
                <button
                  className="cancel-btn btn btn-danger"
                  onClick={() => cancelAppointment(appt._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </Layout>
);

}
