import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaCartPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const ProductCard = ({ product }) => {
    const { productName, productPrice, img } = product;
    const [user] = useAuthState(auth);

    const handleBooking = () => {

        const booking = {
            productName,
            productPrice,
            img,
            user: user.displayName,
            email: user.email
        }

        fetch(`https://wheels-phi.vercel.app/booking`, {
            method:'POSt',
            headers: {
                'content-type' : 'application/json',
                'authorization' : `bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                toast.success('Booking Successfully');
            }
            else{
                toast.error('Booking unSuccessfull')
            }
        })
    }

    return (

        <div className="card lg:max-w-lg shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="tyres" className="w-48 rounded-xl hover:scale-150 duration-300" />
            </figure>
            <div className=" items-center text-center">
                <h2 className="text-xl font-semibold">{productName}</h2>
                <h2 className="font-semibold">Price: ${productPrice}</h2>
                <button onClick={handleBooking} className="rounded text-white bg-gradient-to-r from-cyan-400 to-cyan-700 py-3 px-5 my-5"><span className='flex justify-center items-center'><FaCartPlus className='mr-2' /> Booking Now</span></button>
            </div>
        </div>
    )
}

export default ProductCard