import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import authService from '../appwrite/auth';
 
const VerifyEmail = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);
 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    console.log(secret);
    
    if (userId && secret) {
      authService.verifyEmail(userId, secret)
        .then(response => {
          setStatus('Your email has been successfully verified!');
          console.log('Email verified successfully:', response);
        
        })
        .catch(error => {
          setStatus('There was an error verifying your email.');
         
        });
    } else {
      setStatus('Invalid verification link.');
    }
  }, [location.search]);

  return (
    <div className="verification-page">
      <h1>{status || 'Verifying Your Email...'}</h1>
    </div>
  );
};

export default VerifyEmail;
