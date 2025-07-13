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
      setError(err?.response?.data || "Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex px-16 gap-x-48">
      <div className="max-w-md text-white pt-40 pl-32">
        <h1 className="text-5xl font-bold mb-8">Reset your password</h1>
        <div className="card bg-black shadow-none">
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
                className={`mt-4 w-80 btn btn-ghost text-xl bg-neutral-content text-neutral ${
                  loading ? "loading" : ""
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
      
      <div className="flex items-center justify-center">
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
