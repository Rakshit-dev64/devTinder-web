import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { resetFeed } from "../utils/feedSlice";

export const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(resetFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar navbar-modern text-white shadow px-4 sm:px-8 py-2 bg-[#1e1e1e] backdrop-blur-md bg-opacity-80 w-full z-50 flex justify-between items-center">
      <div className="flex w-2xl items-center gap-5">
        <div className="flex">
          <Link
            to={"/"}
            className="btn btn-ghost text-lg sm:text-xl bg-neutral-content text-neutral ml-2 sm:ml-4"
          >
            DevLink
          </Link>
        </div>
        <div>
          <ul className="flex bg-[#373737] rounded-full px-1  animate-fadeIn shadow-lg">
            <Link to="/profile" className="block w-full h-full">
              <li className="px-4 py-2 rounded-full text-gray-300 font-medium cursor-pointer hover:text-black hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
                Profile
              </li>
            </Link>
            <Link to="/" className="block w-full h-full">
              <li className="px-4 py-2 rounded-full text-gray-300 font-medium cursor-pointer hover:text-black hover:bg-white hover:shadow-md transform transition-all duration-300 ease-in-out">
                Feed
              </li>
            </Link>
            <Link to="/connections" className="block w-full h-full">
              <li className="px-4 py-2 rounded-full text-gray-300 font-medium cursor-pointer hover:text-black hover:bg-white hover:shadow-md transform transition-all duration-300 ease-in-out">
                Connections
              </li>
            </Link>
            <Link to="/requests" className="block w-full h-full">
              <li className="px-4 py-2 rounded-full text-gray-300 font-medium cursor-pointer hover:text-black hover:bg-white hover:shadow-md transform transition-all duration-300 ease-in-out">
                Requests
              </li>
            </Link>
            <a onClick={handleLogout} className="block w-full h-full">
              <li className="px-4 py-2 rounded-full text-gray-300 font-medium cursor-pointer hover:text-red-600 hover:bg-white hover:shadow-md transform transition-all duration-300 ease-in-out">
                Logout
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div className="flex gap-2 items-center animate-fadeIn">
        {user && (
          <>
            <h1 className="mt-2 text-sm sm:text-base hidden sm:block">
              Welcome {user.firstName}
            </h1>

            <div
              className="dropdown dropdown-end mx-2 sm:mx-6 bg-rgba(23, 23, 23, 0.95) relative z-[9999]"
              key={user.emailId}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar btn-sm sm:btn-md"
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profileURL}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const InputField = ({
  value,
  onChange,
  placeholder,
  type,
  onKeyDown,
}) => {
  return (
    <>
      <label className="input mt-5">
        <input
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </>
  );
};
