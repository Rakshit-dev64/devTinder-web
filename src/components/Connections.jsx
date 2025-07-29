import React, { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import UserCard from "./UserCard";
import { UFO } from "./Illustrations";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center flex-col gap-8 sm:gap-14 animate-fadeIn px-4 min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          No connections found
        </h1>
        <div className='flex justify-center'>
          <UFO />
        </div>
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center px-4 py-4 text-white font-medium tracking-wide animate-fadeIn min-h-[calc(100vh-64px)]">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
        Connections
      </h1>
      <div className="w-full max-w-4xl space-y-3 sm:space-y-4">
        {connections.map((user, index) => (
          <motion.div
            key={user._id}
            className="list-item-modern p-4 sm:p-6 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex sm:block items-center gap-3 sm:gap-0 w-full sm:w-auto">
                <img
                  src={user.profileURL}
                  alt="pfp"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md flex-shrink-0"
                />
                <div className="sm:hidden flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.age} • {user.gender}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <div className="hidden sm:flex gap-1.5">
                  <div className="font-semibold text-base">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-right text-gray-500 mt-1.5">
                    {user.age} • {user.gender}
                  </div>
                </div>
                <div className="text-sm opacity-70 mt-1 sm:mt-0">{user.about || " "}</div>
                <div className="text-xs opacity-70 mt-2">
                  {user.skills && user.skills.length > 0
                    ? user.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="mr-1 sm:mr-2 py-1 px-2 bg-white/10 rounded-full inline-block mb-1 text-xs">
                          {skill}
                        </span>
                      ))
                    : " "}
                </div>
              </div>
              <div className="flex justify-end sm:justify-start mt-3 sm:mt-0">
                <Link to={"/chat/" + user._id}>
                  <motion.button 
                    className="btn btn-enhanced !text-green-500 btn-sm sm:btn-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Message
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connections;