import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth"; // Import the AuthService

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract `secret` from the query params in the URL
    const queryParams = new URLSearchParams(location.search);
    const secret = queryParams.get("secret");

    if (secret) {
      // Verify email using the secret
      verifyEmail(secret);
    } else {
      setMessage("Invalid verification link.");
    }
  }, [location.search]);

  const verifyEmail = async (secret) => {
    try {
      await authService.verifyEmail(secret);
      setMessage("Email verified successfully! You can now log in.");
      navigate("/login"); // Redirect to login page after successful verification
    } catch (error) {
      console.error("Verification failed:", error);
      setMessage("Verification failed. Please try again.");
    }
  };

  return <div>{message}</div>;
};

export default VerifyEmail;
