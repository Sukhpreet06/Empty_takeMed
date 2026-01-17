
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import axios from 'axios';
import { Table } from 'antd';
import {toast} from 'react-hot-toast'
function Doctorlist() {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    const ChangeDoctorStatus = async (record , status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-doctor-status',{doctorId:record._id , userId:record.userId,status:status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message)
                getDoctorData();
            }
        } catch (error) {
            toast.error("Something went wrongnchanging the doctor stratus ")
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        getDoctorData();
    }, []);
    const coloumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) =>( <span> 
                {record.firstName} {record.lastName}
            </span>
            ),
        },
        {
            title: 'Contact',
            dataIndex: 'phoneNumber',
        },

        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },

        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                   {record.status ==="pending" && <h1 className='anchor' onClick={()=>ChangeDoctorStatus(record,"approved")}>Approve</h1>}
                   {record.status ==="approved" && <h1 className='anchor' onClick={()=>ChangeDoctorStatus(record , "blocked")}>Block</h1>}
                </div>
            ),
        },


    ];
    return (
        <Layout>
            <h1 className='page-header'>Doctor List</h1>
            <Table columns={coloumns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctorlist