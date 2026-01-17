import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm'
import moment from "moment";
function Profile() {
     const { user } = useSelector(state => state.user);
     const params=useParams();
     const [doctor,setDoctor]=useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const onFinish = async (values) => {
            // const timings = values.timings.map(time => time.format("HH:mm"));
            try {
                dispatch(showLoading());
                const response = await axios.post('/api/doctor/update-doctor-profile',
                    { ...values, userId: user._id ,
                        timings:[
                            moment(values.timings[0]).format("HH:mm"),
                            moment(values.timings[1]).format("HH:mm"),
                        ],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                dispatch(hideLoading());
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
    
            } catch (error) {
                dispatch(hideLoading());
                toast.error("something went Wrong ", error);
            }
    
        };
            const getDoctorData=async()=>{
               try {
                dispatch(showLoading())
                const response= await axios.post
                ('/api/doctor/get-doctor-info-by-user-id',
                    {
                        userId:params.userId,

                    },
                {
                    headers:{
                        Authorization :`Bearer ${localStorage.getItem('token')}`,
                    },
                });
                dispatch(hideLoading())
                if(response.data.success){
                    console.log("response.data.data-----",response.data.data);
                    setDoctor(response.data.data);
                }
               } catch (error) {
                dispatch(hideLoading()) 
               }
            };
        useEffect(()=>{
           
                getDoctorData();
           
        
        },[])
        useEffect(()=>{
            console.log("doctor ---------",doctor);
        },[doctor]);
  return (
  <Layout>
    <h1 className='page-title'>Doctor Profile</h1>
    <hr/>
    {doctor && 
    <DoctorForm onFinish={onFinish} initialvalues={doctor}/>
    }
    
  </Layout>
  )
}

export default Profile