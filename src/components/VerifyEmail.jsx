// VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import authService from '../appwrite/auth';

export default function VerifyEmail() {
    const [status, setStatus] = useState('Verifying...');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userId = params.get('userId');
        const secret = params.get('secret');

        if (userId && secret) {
            authService.verifyEmail(userId, secret)
                .then(() => setStatus('Email verified successfully!'))
                .catch(() => setStatus('Email verification failed. Please try again.'));
        } else {
            setStatus('Invalid verification link.');
        }
    }, [location.search]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold">{status}</h2>
            </div>
        </div>
    );
}
