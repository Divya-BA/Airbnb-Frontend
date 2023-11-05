import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import axios from "axios";
import Spinner from "../components/Spinner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  axios.defaults.withCredentials = true;
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsSendingEmail(true);
    axiosInstance
      .post("/auth/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("email send successfully");
          toast.success("Email sent successfully");
        } else {
          toast.error("Failed to send email");
        }
        setIsSendingEmail(false);
      })
      .catch((err) => {
        toast.error("An error occurred");
        console.log(err);
        setIsSendingEmail(false);
      });
  };

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div>
        <h1 className="mb-4 text-center text-4xl">Forgot Password</h1>
        <form className="mx-auto max-w-md" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
           {isSendingEmail ? (
            <Spinner />
          ) : (
            <button className="primary my-4">Send Reset Email</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
