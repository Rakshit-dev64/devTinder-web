import React, { useState } from "react";
import axios from "axios";
import { InputField } from "./components";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { LoginIllustration } from "./Illustrations";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      console.log(err.response.data);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  return (
    <div className="bg-black flex flex-col lg:flex-row items-center h-screen overflow-hidden w-screen pt-4 lg:pt-10 gap-8 lg:gap-x-16 page-transition px-4">
      <div className="flex flex-col justify-center lg:justify-between lg:pl-52 animate-slideInUp w-full lg:w-auto mt-46 lg:mt-0">
        <div className="border border-white w-fit p-4 lg:p-6 text-3xl lg:text-6xl font-bold bg-neutral-content text-neutral mb-4 lg:mb-8 list-item-modern mx-auto lg:mx-0">
          DevLink
        </div>
        <div className="max-w-md text-white w-full">
          <h1 className="text-2xl lg:text-5xl font-bold mb-4 mt-4 text-center lg:text-left">
            Create your account
          </h1>
          <div className="card bg-black shadow-none lg:justify-center items-center">
            <div className="card-body p-0">
              <fieldset className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div>
                    <InputField
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={"First Name"}
                    />
                  </div>
                  <div>
                    <InputField
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={"Last Name"}
                    />
                  </div>
                </div>
                <div>
                  <InputField
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder={"Email Id"}
                  />
                </div>
                <div>
                  <InputField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Password"}
                  />
                </div>

                <button
                  className="input mt-5 w-80 text-xl bg-neutral-content flex justify-center text-neutral border-0 cursor-pointer hover:bg-neutral-content/92 transition-colors"
                  onClick={handleSignup}
                >
                  Signup
                </button>
                <div className="mt-2">
                  <span className="text-sm text-gray-400">
                    Existing user?{" "}
                    <Link
                      to={"/login"}
                      className="text-blue-400 underline hover:text-blue-500"
                    >
                      Login here
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
      </div>
    </div>
  );
};

export default Signup;
