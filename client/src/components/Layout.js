import React, { useState } from 'react'
import '../layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
function Layout({ children }) {
    const [collaped, setcollapsed] = useState(true);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const userMenu = [
        {
            name: "Home",
            path: '/',
            icon: "ri-home-line",

        },
        {
            name: "Appointments",
            path: '/appointments',
            icon: "ri-file-list-3-line",
        },
        {
            name: "Apply Doctor",
            path: '/apply-doctor',
            icon: "ri-hospital-line",
        },
        {
            name: "Profile",
            path: '/profile',
            icon: "ri-user-3-line",
        },

    ];
    const doctorMenu = [
        {
            name: "Home",
            path: '/',
            icon: "ri-home-line",

        },
        {
            name: "Appointments",
            path: '/appointments',
            icon: "ri-file-list-3-line",
        },{
            name: "Profile",
            path:`/doctor/profile/${user?._id}`,
            icon: "ri-user-3-line",
        }

    ];
    const adminMenu = [
        {
            name: "Home",
            path: '/',
            icon: "ri-home-line",

        },
        {
            name: "Users",
            path: "/userList",
            icon: "ri-user-line",
        },
        {
            name: "Doctors",
            path: "/doctorList",
            icon: "ri-user-star-line",
        },
        {
            name: "Profile",
            path: '/profile',
            icon: "ri-user-3-line",
        },

    ];
    const menuToBerendered = user?.isAdmin ? adminMenu : user?.isDoctor? doctorMenu: userMenu;
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className='sidebar-header'>
                        <h1 className='logo'>TM</h1>
                    </div>
                    <div className='menu'>
                        {menuToBerendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collaped && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='ri-logout-circle-line'></i>
                            {!collaped && <Link to='/login'>Logout</Link>}
                        </div>

                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collaped ? (
                            <i className="ri-menu-2-fill header-action-icon"
                                onClick={() => { setcollapsed(false) }}
                            ></i>
                        ) : (
                            <i className="ri-close-fill header-action-icon" onClick={() => setcollapsed(true)}
                            ></i>
                        )}
                        <div className='d-flex align-items-center px-4'>
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate("/notifications")}>
                            <i className='ri-notification-line header-action-icon px-3'></i>
                            </Badge>
                            
                            <Link className='anchor' to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>

            </div>
        </div>
    ) //<link href ="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" rel="stylesheet">
}

export default Layout