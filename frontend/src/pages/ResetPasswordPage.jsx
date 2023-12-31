import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import axios from "axios";
import Spinner from "../components/Spinner";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  axios.defaults.withCredentials = true;
  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsResettingPassword(true);
    axiosInstance
      .post(`/auth/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Password reset successful");
          navigate("/login");
        } else {
          toast.error("Password reset failed");
        }
        setIsResettingPassword(false);
      })
      .catch((err) => {
        toast.error("An error occurred while resetting the password");

        console.log(err);
        setIsResettingPassword(false);
      });
  };
  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div>
        <h1 className="mb-4 text-center text-4xl">Reset Password</h1>
        {resetSuccess ? (
          <div>
            <p>Password reset successful</p>
            <Link to="/login">Go to Login</Link>
          </div>
        ) : (
          <form className="mx-auto max-w-md" onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
             {isResettingPassword ? ( 
              <Spinner />
            ) : (
              <button className="primary my-4">Reset Password</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
