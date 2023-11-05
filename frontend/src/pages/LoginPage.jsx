import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
      setIsLoggingIn(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  // if (auth.user) {
  //   return <ProfilePage />;
  // }

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div className="mb-40">
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleFormData}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleFormData}
          />
            {isLoggingIn ? ( 
            <Spinner />
          ) : (
            <button className="primary my-4">Login</button>
          )}
         
        </form>
        <div className="py-2 text-center text-gray-500">
          Don't have an account yet?{" "}
          <Link className="text-black underline" to={"/register"}>
            Register now
          </Link>
          <div>
            <Link className="text-black underline" to={"/forgot-password"}>
              ForgotPassword!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
