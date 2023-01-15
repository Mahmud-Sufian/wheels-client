import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'

const CheckOutForm = ({ product }) => {
    const { price, _id } = product;
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    // const [transactionId, setTransactionId] = useState('');
    // const [success, setSuccess] = useState('');
    // const [processing, setProcessing] = useState(false);

    const [clientSecret, setClientSecret] = useState("");
    // useEffect(() => {
    //     fetch("https://wheels-phi.vercel.app/create-payment-intent", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'authorization': `bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify({ price }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data?.clientSecret) {
    //                 setClientSecret(data.clientSecret);
    //             }

    //         });
    // }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }


        // confirm card payment
        // const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
        //     clientSecret,
        //     {
        //         payment_method: {
        //             card: card
        //         },
        //     },
        // );

        // if (intentError) {
        //     setCardError(intentError?.message);
        //     setSuccess('');
        //     setProcessing(false);
        // }
        // else {
        //     setCardError('');
        //     setTransactionId(paymentIntent.id);
        //     setSuccess('Congratulations, Your Payment is completed');

        // }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='bg-gradient-to-r from-cyan-300 to-cyan-700 py-1 px-5 rounded-md' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

            {
                <>
                    <p className='text-red-500'>{cardError}</p>


                    {/* {
                        success && <div>
                            <p className='text-green-500'>{success}</p>
                            <p><small>Your transactionId: <span className='font-bold text-orange-400'>{transactionId}</span></small></p>
                        </div>
                    } */}
                </>
            }
        </>
    )

}
export default CheckOutForm