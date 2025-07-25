import React, { useState } from "react";
import axios from "axios";
import { InputField } from "./components";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { LoginIllustration } from "./Illustrations";

const ForgetPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!emailId || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        BASE_URL + "/password/reset",
        { emailId, password },
        { withCredentials: true }
      );

      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data || "Something went wrong. Please try again."
      );
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex flex-col lg:flex-row items-center h-screen overflow-hidden w-screen pt-4 lg:pt-10 gap-8 lg:gap-x-16 page-transition px-4">
      <div className="flex flex-col justify-center lg:justify-between lg:pl-52 animate-slideInUp w-full lg:w-auto mt-50 lg:mt-0">
        <div className="border border-white w-fit p-4 lg:p-6 text-3xl lg:text-6xl font-bold bg-neutral-content text-neutral mb-4 lg:mb-8 list-item-modern mx-auto lg:mx-0">
          DevLink
        </div>
        <div className="max-w-md text-white w-full">
          <h1 className="text-2xl lg:text-5xl font-bold mb-4 mt-4 text-center lg:text-left">
            Reset your password
          </h1>
          <div className="card bg-black shadow-none lg:justify-center items-center">
            <div className="card-body p-0">
              <fieldset className="space-y-4">
                <div>
                  <InputField
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder={"Email Id"}
                    type={"email"}
                  />
                </div>

                <div>
                  <InputField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={"New Password"}
                    type={"password"}
                  />
                </div>

                <div>
                  <InputField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={"Confirm New Password"}
                    type={"password"}
                  />
                </div>

                <button
                  className={`input mt-5 w-80 text-xl bg-neutral-content flex justify-center text-neutral border-0 cursor-pointer hover:bg-neutral-content/92 transition-colors ${
                    loading ? "opacity-50" : ""
                  }`}
                  onClick={handlePasswordReset}
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="mt-4">
                  <span className="text-sm text-gray-400">
                    Remember your password?{" "}
                    <Link
                      to={"/login"}
                      className="text-blue-400 underline hover:text-blue-500"
                    >
                      Login here
                    </Link>
                  </span>
                </div>

                <div className="mt-2">
                  <span className="text-sm text-gray-400">
                    New user?{" "}
                    <Link
                      to={"/signup"}
                      className="text-blue-400 underline hover:text-blue-500"
                    >
                      Sign up here
                    </Link>
                  </span>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center mb-8 lg:mb-24 animate-slideInUp order-first lg:order-last">
        <LoginIllustration />
      </div>

      <div className="toast toast-top toast-center">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
