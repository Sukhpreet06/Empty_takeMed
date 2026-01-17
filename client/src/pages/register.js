import React from 'react'
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertSlice';
export default function Register() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onFinish = async (values) => {
    try {
     dispatch(showLoading());
      const response = await axios.post('/api/users/register', values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting To Login Page ");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went Wrong ",error);
    }
  };
  
  return (
    <div className='authentication'>
      <div className='authentication-form card p-4'>
        <h1 className='card-title'> Nice To Meet You</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Name' name='name'>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Email Account' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input placeholder='Enter Your Passwrod/passcode' type='password' />
          </Form.Item>
         
          <Button className='primary-button my-2 full-width-button' htmlType='submit'>Register</Button>
          <Link to='/login' className='anchor'> click Here To Login</Link>
          

          
        </Form>
      </div>
    </div>
  )
}
