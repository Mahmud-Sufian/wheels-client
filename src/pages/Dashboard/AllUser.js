import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const AllUser = () => {

    const { data: users, isLoading, refetch } = useQuery('user', () => fetch(`https://wheels-phi.vercel.app/user`).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="overflow-x-auto">
            <h2 className='font-semibold text-cyan-700 text-xl'>Total User: {users?.length}</h2>
            <table className="table w-full">
                <thead className='text-cyan-700'>
                    <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>isAdmin</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody className='text-cyan-700'>
                    {
                        users.map((user, i) => <UserRow key={i} user={user} i={i} refetch={refetch}></UserRow>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUser