import React from 'react'

const BookingRow = ({ book, i }) => {
    const {productName, productPrice, img } = book;

    return (
        <tr>
            <th>{i + 1}</th>
            <td>
                <img className='w-12 rounded-full' src={img} />
            </td>
            <td>{productName}</td>
            <td>{productPrice}</td>
        </tr>
    )
}

export default BookingRow