import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import auth from '../../firebase.init'
import Loading from '../Shared/Loading'
import BookingRow from './BookingRow'

const MyBooking = () => {
  const [user] = useAuthState(auth);

  const { data: bookings, isLoading } = useQuery(['booking', user], () => fetch(`https://wheels-phi.vercel.app/booking?email=${user.email}`, { method: 'GET', headers: { 'authorization': `bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()))

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h1 className='text-2xl text-cyan-700 mb-4'>Hello <span className='text-orange-400 uppercase font-semibold'>{user.displayName}</span>, Your Total Booking <span className='font-semibold text-orange-400'>{bookings?.length}</span></h1>

      <div className="overflow-x-auto">
        
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {
              bookings.map((book, i) => <BookingRow key={i} book={book} i={i}></BookingRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBooking