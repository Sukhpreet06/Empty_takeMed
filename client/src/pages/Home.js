import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from './appointment.js'
export default function Home() {
  const [user,setuser]=useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const navigate = useNavigate();
  const getdata = async () => {
    try {
      console.log("calling /all route");
      const response = await axios.post("/api/users/get-user-info-by-id",{},
         { 
          headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          },//headers
    })
    console.log(response.data)
}
 catch (error) {
    console.log(error)

  }
};
useEffect(() => {
  getdata();
}, []);
const DoctorCard = ({ doctor,onBook }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.firstName+doctor.lastName}</h3>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Fees:</strong> ₹{doctor.feePerConsultation}</p>
      <p><strong>Time:</strong> {doctor.timings?.start} - {doctor.timings?.end}</p>
      <p><strong>City:</strong> {doctor.address}</p>

      <button className=" book-button"  onClick={() => onBook(doctor)}>Book</button>
    </div>
  );
};

const [doctors, setDoctors] = useState([]);
useEffect(() => {
  console.log("showModal:", showModal);
  console.log("selectedDoctor:", selectedDoctor);
}, [showModal, selectedDoctor]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get("/api/doctor/all", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
      setDoctors(res.data.doctors);
    };
    fetchDoctors();
  }, []);
return (
 <Layout>
  <div className="doctor-grid">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} onBook={(doctor) => {
             console.log("Doctor clicked:", doctor);
      setSelectedDoctor(doctor);
      setShowModal(true);
    }}/>
        ))}
       {showModal && selectedDoctor && (
  <AppointmentModal
    isOpen={showModal}
    doctor={selectedDoctor}
    onClose={() => setShowModal(false)}
  />
)}

      </div>
 </Layout>
 
)
}
