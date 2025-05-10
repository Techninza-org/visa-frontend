import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Install this library using `npm install js-cookie`

export default function useUserProfile() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = Cookies.get('id'); // Replace 'id' with the name of your cookie
                if (!id) {
                    console.error('User ID not found in cookies');
                    return;
                }

                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/${id}`);
                setData(res.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, []);

    return data;
}
