import { useEffect, useState } from "react"

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    const email = user?.email;
    useEffect(() => {
        if(email){
            fetch(`https://wheels-phi.vercel.app/admin/${email}`, {
                method:'GET',
                headers: {
                    'authorization' : `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setAdmin(data);
                setAdminLoading(false);
            })
        }
    }, [user, email]);

    return [admin, adminLoading];
}

export default useAdmin;