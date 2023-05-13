import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();

    const verifyEmailUrl = async () => {
        try {
            const url = `/api/users/${params.id}/verify/${params.token}`;

            await axios.get(url);
            setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, []);

    return (<>
        <div className='container'>
            {validUrl ? <>
                <h1>Email verified!</h1>
                <Link to={'/login'}><button className='btn my-btn'>Login</button></Link>
            </> : <h1>Invalid or expired url!</h1>}
        </div>
    </>);
}

export default EmailVerify;