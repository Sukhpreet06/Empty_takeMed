import React from 'react'
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log("calling login api--->")
      const response = await axios.post('/api/users/login', values);
      dispatch(hideLoading());
      if (response.data.success) { 
        toast.success(response.data.message);
        toast("Redirecting To Home Page ");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went Wrong ", error);
    }
  };
  return (
    <div className='authentication'>
      <div className='authentication-form card p-4'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Email Account' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input placeholder='Enter Your Passwrod/passcode' type='password' />
          </Form.Item>
          <Button className='primary-button my-2 full-width-button' htmlType='submit'>login</Button>
          <Link to='/register' className='anchor'>Don't Have Account,  Register</Link>
        </Form>
      </div>
    </div>
  )
}
