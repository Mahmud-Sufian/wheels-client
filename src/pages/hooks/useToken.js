import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');

    const email = user?.user?.email;
    const created = {email: email};

    useEffect(() => {
        if (email) {
            fetch(`https://wheels-phi.vercel.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(created)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.acknowledged) {
                        const accessToken = data.token;
                        localStorage.setItem('accessToken', accessToken);
                        setToken(data.token);
                    }

                })
        }
    }, [email])

    return [token];
}

export default useToken;