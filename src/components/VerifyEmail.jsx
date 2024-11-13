import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          setStatus('There was an error verifying your email.',error);
         
        });
    } else {
      setStatus('Invalid verification link.');
    }
  }, [location.search]);

  return (
    <div className="verification-page py-20 flex justify-center flex-col items-center gap-y-3">
      <h1 className='font-medium text-center '>{status || 'Verifying Your Email...'}</h1>
    <Link to='/login'> <button className='bg-text-purple/30 p-3 py-2 rounded-md'>Go back</button></Link>
    </div>
  );
};

export default VerifyEmail;
