import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../hooks/useAdmin'
import Nav from '../Shared/Nav'
import { FaCartPlus, FaFolder, FaPlusSquare } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    
    return (
        <div>
            <Nav></Nav>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <h1 className='text-3xl text-cyan-700 my-5 font-bold'>Welcome to Your Dashboard</h1>
                    <Outlet></Outlet>
                </div>


                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-52 text-cyan-700 font-semibold">
                        <li><Link to='/dashboard'><span className='flex justify-center items-center'><FaCartPlus className='mr-2' />My Booking</span></Link></li>
                        {admin &&
                            <>
                                <li><Link to='/dashboard/addProduct'><span className='flex justify-center items-center'><FaPlusSquare className='mr-2' /> Add Product</span></Link></li>
                                <li><Link to='/dashboard/allUsers'><span className='flex justify-center items-center'><FaUserFriends  className='mr-2' /> All User's</span></Link></li>
                                <li><Link to='/dashboard/allBookings'><span className='flex justify-center items-center'><FaFolder  className='mr-2' /> All Bookings</span></Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Dashboard