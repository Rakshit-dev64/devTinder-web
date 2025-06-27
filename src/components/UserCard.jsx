import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, profileURL, age } = user;
  

  return (
    user &&
    <div className="relative w-96 h-[600px] rounded-xl overflow-hidden shadow-lg">
      <img src={profileURL} alt="pfp" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 text-white px-4 pb-5 w-full">
        <h2 className="text-2xl font-bold flex items-baseline gap-2">
          {firstName} {lastName}
          <span className="text-sm text-gray-300 font-normal">{age}</span>
        </h2>
        <p className="text-sm mt-1">{about}</p>

        <div className="flex justify-center mt-4 gap-4">
          <button className="btn btn-neutral-content text-red-500 hover:bg-red-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95 mx-2">
            Ignore
          </button>
          <button className="btn btn-neutral-content text-blue-500 hover:bg-blue-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
