import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return;
  const { _id, firstName, lastName, about, profileURL, age, gender, skills } =
    user;
  const dispatch = useDispatch();
  const [showFullAbout, setShowFullAbout] = useState(false);
  const sendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };
  const MAX_LENGTH = 100;
  const displayedAbout =
    about && (showFullAbout || about.length <= MAX_LENGTH)
      ? about
      : about
      ? about.slice(0, MAX_LENGTH) + "..."
      : "";

  return (
    user && (
      <div className="relative w-full max-w-sm mx-auto h-[600px] sm:h-[600px] rounded-xl overflow-hidden shadow-2xl shadow-black transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-3xl hover:shadow-blue-900/30">
        <img
          src={profileURL}
          alt="pfp"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent "></div>

        <div className="absolute bottom-0 text-white px-4 pb-5 w-full">
          <h2 className="text-2xl font-bold flex items-baseline gap-2">
            {firstName} {lastName}
            <span className="text-sm text-gray-300 font-normal">
              {age} • {gender}
            </span>
          </h2>
          <p className="text-sm mt-1">
            {displayedAbout}
            {about && about.length > MAX_LENGTH && (
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-gray-200 underline text-xs"
              >
                {showFullAbout ? "Show less" : "Show more"}
              </button>
            )}
          </p>
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs bg-white/20 text-white rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-4 gap-4">
            <button
              className="btn btn-enhanced  !text-red-500 mx-2 px-6 hover:scale-105"
              onClick={() => {
                sendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-enhanced  !text-blue-500 px-4 hover:scale-105"
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
