import React from 'react'

const AllBookingRow = ({ book, i }) => {
    const { _id, user, email, productName, productPrice, img } = book;

    return (
        <tr>
            <th>{i + 1}</th>
            <td>{user}</td>
            <td>{email}</td>
            <td>
                <img className='w-12 rounded-full' src={img} />
            </td>
            <td>{productName}</td>
            <td>{productPrice}</td>
        </tr>
    )
}

export default AllBookingRow