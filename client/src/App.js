
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notification from './pages/Notification';
import Userlist from './pages/Admin/Userlist';
import Doctorlist from './pages/Admin/Doctorlist';
import Profile from './pages/Doctor/Profile';
import AppointmentModal from './pages/appointment.js';
import MyAppointments from './pages/MyAppointments.js';
import UserProfile from './pages/UserProfile.js';
function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
      <div className='spinner-parent'>
        <div class="spinner-border" role="status"></div>
      </div>
      )}
      <Toaster position='top-center' reverseOrder={false} />

      <Routes>

        <Route path='/login' element={<PublicRoute> <Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute> <Register></Register></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notification/></ProtectedRoute>} />
        <Route path='/userList' element={<ProtectedRoute><Userlist/></ProtectedRoute>}></Route>
        <Route path='/doctorList' element={<ProtectedRoute><Doctorlist/></ProtectedRoute>}></Route>
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path='/appointments' element={<ProtectedRoute><MyAppointments/></ProtectedRoute>}></Route>
         <Route path='/profile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
        {/* <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><AppointmentModal/></ProtectedRoute>}></Route> */}

      </Routes>


    </BrowserRouter>
  );
}

export default App;
