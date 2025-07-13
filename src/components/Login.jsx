import React, { useState } from "react";
import axios from "axios";
import { InputField } from "./components";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { LoginIllustration } from "./Illustrations";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  return (
       <div className="bg-black flex items-center h-screen overflow-hidden w-screen pt-10 gap-x-16 page-transition">
      <div className="flex flex-col justify-between pl-52 animate-slideInUp">
        <div className="border border-white w-fit p-6 text-6xl font-bold bg-neutral-content text-neutral mb-8 list-item-modern">
          DevLink
        </div>
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold mb-4 mt-4">Login to your account</h1>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Password"}
                  type={"password"}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div>
                <Link to="/password/reset" className="link link-hover text-sm text-gray-400 ">
                  Forgot password?
                </Link>
              </div>
              <button
                className="mt-4 w-80 btn btn-ghost text-xl bg-neutral-content text-neutral"
                onClick={handleLogin}
              >
                Login
              </button>
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
      <div className="flex items-center justify-center mb-24 animate-slideInUp">
        <LoginIllustration />
      </div>
      <div className="toast toast-top toast-center">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;