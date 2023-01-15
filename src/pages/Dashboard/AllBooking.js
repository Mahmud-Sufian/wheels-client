import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading'
import AllBookingRow from './AllBookingRow'

const AllBooking = () => {

    const { data: allBookings, isLoading } = useQuery('allBookings', () => fetch(`https://wheels-phi.vercel.app/allBooking`, { method: 'GET', headers: { 'authorization': `bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-2xl text-cyan-700 mb-4'>Total Booking <span className='font-semibold text-orange-400'>{allBookings?.length}</span></h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Photo</th>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        allBookings.map((book, i) => <AllBookingRow key={i} book={book} i={i}></AllBookingRow>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllBooking