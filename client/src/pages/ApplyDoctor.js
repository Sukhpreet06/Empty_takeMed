
import React from 'react';
import Layout from '../components/Layout';
// import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';
import moment from 'moment';
function ApplyDoctor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    // const onFinish = async (values) => {
    //      if (!values.timings || values.timings.length !== 2) {
    //     toast.error("Please select timings");
    //     return;
    // }

    // const timings = [
    //     moment(values.timings[0]).format("HH:mm"),
    //     moment(values.timings[1]).format("HH:mm"),
    // ];
    //     try {
    //         dispatch(showLoading());
    //         const response = await axios.post('/api/users/apply-doctor-account',
    //             { ...values, userId: user._id, timings },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             }
    //         );
    //         dispatch(hideLoading());
    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             navigate("/");
    //         } else {
    //             toast.error(response.data.message);
    //         }

    //     } catch (error) {
    //         dispatch(hideLoading());
    //         toast.error("something went Wrong ", error);
    //     }

    // }
    const onFinish = async (values) => {

    //  FIX: safe check
    if (!values.timings || values.timings.length !== 2) {
        toast.error("Please select timings");
        return;
    }

    const timings = [
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
    ];

    try {
        dispatch(showLoading());

        const response = await axios.post(
            "/api/users/apply-doctor-account",
            {
                ...values,
                userId: user._id,
                timings,  // clean & simple
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
        toast.error("something went Wrong");
    }
};

    return (
        <Layout layout='vertical'>
            <h1 className='page-title'> Apply Doctor</h1>
            <hr/>
            <DoctorForm onFinish={onFinish}/>
          
        </Layout>
    )
}
export default ApplyDoctor;