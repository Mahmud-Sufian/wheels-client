import React from 'react'
import { toast } from 'react-toastify';

const UserRow = ({ user, i, refetch }) => {
    const { email } = user;

    const handleAdmin = () => {
        fetch(`https://wheels-phi.vercel.app/admin/${email}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.result?.modifiedCount) {
                    refetch();
                    toast.success('Admin Addeded Successfully');
                }
                else {
                    toast.error("Can't Addeded Admin");
                }

            })
    }

    return (
        <tr>
            <th>{i + 1}</th>
            <td>{email}</td>
            <td><button onClick={handleAdmin} disabled={user.role === 'admin'} className="rounded-md text-white bg-gradient-to-r from-cyan-400 to-cyan-700 btn-xs">{user.role === 'admin' ? 'ADMIN' : 'Make Admin'}</button></td>
            <td><button className="rounded-md text-white bg-gradient-to-r from-cyan-400 to-cyan-700 btn-xs">Remove</button></td>

        </tr>
    )
}

export default UserRow