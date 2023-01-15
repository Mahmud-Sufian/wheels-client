import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const stripeKey = `pk_test_51MLAoQHmbMftvoQinKFnpKFSpatIdw2hPGDZbiKM1WVqSw6Cnv9A6CpWOIqO3auaWu7s9KRa1gFrG4L5GxzTf2Mz00An1FV6Xa`;
    const stripePromise = loadStripe(stripeKey);

    fetch(`https://wheels-phi.vercel.app/booking/${id}`, {
        method: 'GET',
        headers: {
            'authorization': `bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })


    return (
        <section className=''>

            <div>
                <div className="mt-5 p-8 rounded-md w-1/2 shadow-xl">
                    <h2 className='text-cyan-500 font-semibold text-3xl text-center'>Purchase Your Product</h2>
                    <div>
                        <div className=' flex justify-center'>
                            <img src={product.img} alt="product" className="rounded-xl max-w-xs" />
                        </div>
                        <h2 className="text-2xl text-cyan-700 text-center font-semibold">{product.productName}</h2>
                        <h2 className="text-2xl text-cyan-700 text-center font-semibold">Price: {product.productPrice}</h2>
                    </div>
                </div>

                <div className="mt-5 p-8 rounded-md w-1/2 shadow-xl">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm product={product} />
                    </Elements>
                </div>
            </div>

        </section>
    )
}

export default Payment