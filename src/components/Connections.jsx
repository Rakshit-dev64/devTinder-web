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
      <div className="flex justify-center items-center flex-col mt-14 gap-14 animate-fadeIn">
        <h1 className="text-4xl font-bold">
          No connections found
        </h1>
        <div>
          <UFO />
        </div>
      </div>
    );
  return (
    <div className="flex flex-col items-center mt-8 px-4 text-white font-medium tracking-wide animate-fadeIn">
      <h1 className="text-2xl font-bold mb-6">
        Connections
      </h1>
      <div className="w-full max-w-3xl space-y-4">
        {connections.map((user, index) => (
          <motion.div
            key={user._id}
            className="list-item-modern p-6 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.profileURL}
                alt="pfp"
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />
              <div className="flex-1">
                <div className="flex gap-1.5">
                  <div className="font-semibold text-base">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-right text-gray-500 mt-1.5">
                    {user.age} • {user.gender}
                  </div>
                </div>
                <div className="text-sm opacity-70">{user.about || " "}</div>
                <div className="text-xs opacity-70">
                  {user.skills && user.skills.length > 0
                    ? user.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="mr-2 py-1 px-2 bg-white/10 rounded-full inline-block mb-1">
                          {skill}
                        </span>
                      ))
                    : " "}
                </div>
              </div>
              <Link to={"/chat/" + user._id}>
                <motion.button 
                  className="btn btn-enhanced !text-green-500 mr-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Message
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connections;