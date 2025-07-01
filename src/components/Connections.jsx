import React, { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import UserCard from "./UserCard";
import { UFO } from "./Illustrations";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err){
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
  <div className='flex justify-center items-center flex-col mt-14 gap-14'>
    <h1 className="text-4xl font-bold">No connections found</h1>
    <div>
      <UFO/>
    </div>
  </div>
  
    )
  return (
    <div className="flex flex-col items-center mt-8 px-4 text-white font-medium tracking-wide">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>
      <ul className="bg-[#000] rounded-box shadow-md w-full max-w-3xl">
        {connections.map((user) => (
          <li
            key={user._id}
            className="list-row border-b border-base-200 p-4 hover:bg-neutral-950 transition h-36 pl-10 pt-8"
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
                <div className="text-sm opacity-70">
                  {user.about || " "}
                </div>
                <div className="text-xs opacity-70">
                  {user.skills && user.skills.length > 0
                    ? user.skills.map((skill, index) => (
                        <span key={index} className="mr-2 py-1">
                          {skill}
                        </span>
                      ))
                    : " "}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
