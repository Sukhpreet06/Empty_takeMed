import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import {showLoading , hideLoading} from  '../redux/alertSlice';
function ProtectedRoute(props) {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const getuser=async()=>{
       try {
        dispatch(showLoading)
        const response= await axios.post
        ('/api/users/get-user-info-by-id',{token: localStorage.getItem("token") },
        {
            headers:{
                Authorization :`Bearer ${localStorage.getItem('token')}`,
            },
        });
        dispatch(hideLoading)
        if(response.data.success){
            dispatch(setUser(response.data.data))
        }else{
            localStorage.clear();
            navigate("/login")
        }
       } catch (error) {
        dispatch(hideLoading)
        localStorage.clear();
        navigate("/login")
       }
    }
useEffect(()=>{
    if(!user){
        getuser();
    }

},[user])

if(localStorage.getItem("token")){
    return props.children;
}else{
    return <navigate to={"/login"}/>
}
}

export default ProtectedRoute;