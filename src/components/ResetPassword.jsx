import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Button, Input } from './index'; 
import authService from '../appwrite/auth'; 
import { useSearchParams } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const expire = searchParams.get('expire');

  const navigate = useNavigate();

  useEffect(() => {
    if (userId && secret && expire) {
      setError('');
      setSuccess('');
    }
  }, [userId, secret, expire]);

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.requestPasswordRecovery(email);
      setSuccess('A password recovery email has been sent.');
    } catch (err) {
      setError(err.message || 'An error occurred while requesting password recovery.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Please enter both the new password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(userId, secret, newPassword);
      setSuccess('Your password has been successfully reset.');
      
      // Redirect to login after success
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold">
          {userId && secret && expire ? 'Reset Your Password' : 'Forgot Your Password?'}
        </h2>
        
        {!userId && !secret && !expire && (
          <>
            <p className="mt-2 text-center text-base text-black/60">
              Enter your email to receive a password recovery link.
            </p>
            
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
            
            <form onSubmit={handleRecoverySubmit} className="mt-8">
              <div className="space-y-5">
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  loading={loading}
                  type="submit"
                  className="w-full"
                >
                  Send Recovery Email
                </Button>
              </div>
            </form>
          </>
        )}

        {userId && secret && expire && (
          <>
            <p className="mt-2 text-center text-base text-black/60">
              Enter a new password to reset your account password.
            </p>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
            
            <form onSubmit={handleResetSubmit} className="mt-8">
              <div className="space-y-5">
                <Input
                  label="New Password"
                  placeholder="Enter your new password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your new password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  loading={loading}
                  type="submit"
                  className="w-full"
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </>
        )}
        
        {!userId && !secret && !expire && (
          <p className="mt-4 text-center text-sm">
            Remembered your password? 
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
