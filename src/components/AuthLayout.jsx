import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        const redirectToLogin = () => {

            const searchParams = new URLSearchParams(location.pathname);
            const redirectTo = searchParams.get('redirect') || '/login';
            console.log(redirectTo, 'red');
            navigate(redirectTo);
        };

        if (authentication && authStatus !== authentication) {
            redirectToLogin();
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }

        setLoader(false);
    }, [authStatus, navigate, authentication, location]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
