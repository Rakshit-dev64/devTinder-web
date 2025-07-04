import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, profileURL, age, gender, skills } = user;
  const dispatch = useDispatch();
  const [showFullAbout, setShowFullAbout] = useState(false);
  const sendRequest = async (status, _id) => {
    try{
    const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
      } catch(err){
        console.error(err);
      }
  };
  const MAX_LENGTH = 100;
  const displayedAbout =
    showFullAbout || about.length <= MAX_LENGTH
      ? about
      : about.slice(0, MAX_LENGTH) + "...";

  return (
    user && (
      <div className="relative w-96 h-[600px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={profileURL}
          alt="pfp"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 text-white px-4 pb-5 w-full">
          <h2 className="text-2xl font-bold flex items-baseline gap-2">
            {firstName} {lastName}
            <span className="text-sm text-gray-300 font-normal">
              {age} • {gender}
            </span>
          </h2>
          <p className="text-sm mt-1">
            {displayedAbout}
            {about.length > MAX_LENGTH && (
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-gray-200 underline text-xs"
              >
                {showFullAbout ? "Show less" : "Show more"}
              </button>
            )}
          </p>
          <div className="text-xs opacity-70">
            {skills && skills.length > 0
              ? skills.map((skill, index) => (
                  <span key={index} className="mr-2 py-1">
                    {skill}
                  </span>
                ))
              : " "}
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <button
              className="btn btn-neutral-content text-red-500 hover:bg-red-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95 mx-2"
              onClick={() => {
                sendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-neutral-content text-blue-500 hover:bg-blue-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95"
              onClick={() => {
                sendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
