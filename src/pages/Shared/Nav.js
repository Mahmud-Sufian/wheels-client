import { signOut } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../firebase.init';
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

const Nav = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        signOut(auth);
        navigate('/login');
    }

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/about'>About</Link></li>
        {
            user ?
                <li className="text-red-900"><button onClick={handleSignOut} ><span className='flex justify-center items-center'><FaSignOutAlt  className='mr-2' /> Sign Out</span></button></li>
                : <li><Link to='/login'><span className='flex justify-center items-center'><FaSignInAlt className='mr-2' /> Login</span></Link></li>
        }
        <li className='font-semibold'><Link to=''>{user?.displayName && <span className='flex justify-center items-center'><FaUser  className='mr-2' /> {user?.displayName}</span>}</Link></li>
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-cyan-700">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-4xl  text-cyan-700">WHEELS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  text-cyan-700">
                    {menuItems}
                </ul>
            </div>

            {/* <div className="">
                <button className="btn btn-ghost text-cyan-700">{user?.displayName}</button>
            </div> */}

            <div className="navbar-end">
                <label tabIndex={1} htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>

        </div>
    )
}

export default Nav