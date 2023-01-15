import React from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../../img/banner1.jpg';
import Button from '../Shared/Button';
import bg1 from '../../img/bg1.png';

const HomeBanner = () => {
    return (
        <div style={{background: `url(${bg1})`, backgroundSize: 'cover'}} className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={banner1} className=" w-md lg:w-2/5 rounded-lg shadow-2xl" />
                <div className=''>
                    <h1 className="text-5xl text-cyan-700 font-bold">Wheels Office News!</h1>
                    <p className="py-6">Make a statement with our huge selection of rims. Check out the latest wheel styles on your vehicle with our visualizer. Find the perfect fit for your ride.</p>
                    <Button htmlFor='message'>Get in Touch</Button>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner