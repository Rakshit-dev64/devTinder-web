import React from "react";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, gender, profileURL } = user;
  return (
    <div>
      <div className="card bg-neutral w-xl shadow-sm">
        <figure>
          <img src={profileURL} alt="pfp"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName} </h2>
          <p className="text-xs">{about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-neutral-content text-red-500 hover:bg-red-500 hover:text-neutral-content transition-all duration-400 transform hover:scale-105 focus:scale-95 mx-2">
              Ignore
            </button>
            <button className="btn btn-neutral-content text-blue-500 hover:bg-blue-500 hover:text-neutral-content transition-all duration-400 transform hover:scale-105 focus:scale-95">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
