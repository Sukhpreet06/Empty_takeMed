import React from 'react'
// import Layout from '../components/Layout';
import { Button, Col, Form, Input, Row , TimePicker } from 'antd';
import moment from 'moment';
// import { useSelector, useDispatch } from 'react-redux';
// import { showLoading, hideLoading } from '../redux/alertSlice';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

function DoctorForm({onFinish,initialvalues}) {
    
  return (
    <Form  layout="vertical" onFinish={onFinish} 
    initialValues={{
  ...initialvalues,
  timings: initialvalues?.timings
    ? [
        moment(initialvalues.timings[0], "HH:mm"),
        moment(initialvalues.timings[1], "HH:mm"),
      ]
    : null,
}}
>
    <h1 className='card-title'>Personel Information</h1>
    <hr></hr>
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="First name" name='firstName' rules={[{ required: true }]}>
                <Input placeholder='First Name'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Last Name" name='lastName' rules={[{ required: true }]}>
                <Input placeholder='last Name'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Email" name='email' rules={[{ required: true }]}>
                <Input placeholder='Email'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Contact Number" name='phoneNumber' rules={[{ required: true }]}>
                <Input placeholder='ContactNumber'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="websSite" name='website' rules={[{ required: true }]}>
                <Input placeholder='Website'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Address" name='address' rules={[{ required: true }]}>
                <Input placeholder='Address'></Input>
            </Form.Item>
        </Col>

    </Row>
    <hr></hr>
    <h1 className='card-title'>Profesional Information</h1>
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Specialization" name='specialization' rules={[{ required: true }]}>
                <Input placeholder='Specialization'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Experience" name='experience' rules={[{ required: true }]}>
                <Input placeholder='How Much experiance you have '></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Fees Per Consultant" name='feePerConsultation' rules={[{ required: true }]}>
                <Input placeholder='FeePerConsultation'></Input>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="FromTime" name='timings' rules={[{ required: true }]}>
                <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
        </Col>

    </Row>
    <div className='d-flex justify-content-end '>
        <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
    </div>
</Form>
  )
}

export default DoctorForm