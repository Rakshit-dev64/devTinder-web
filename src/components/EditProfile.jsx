import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [profileURL, setprofileURL] = useState(user.profileURL);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, age, profileURL, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      },5000)
    } catch (err) {
      setError(err?.response?.data);
      setTimeout(()=>{
        setError(false);
      },5000)
    }
  };

  return (
    <div className="flex justify-center gap-8 mt-2">
      <div className="flex justify-center card-xl">
        <div className="card bg-neutral w-md shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center mb-5">Edit Profile</h2>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">
                Profile Picture
              </legend>
              <input
                type="text"
                className="input"
                value={profileURL}
                onChange={(e) => setprofileURL(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>

            {/* <p className='text-red-500 text-sm mt-1 mb-1 min-h-[1.25rem]'>{error}</p> */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-neutral-content text-primary hover:btn-primary hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95"
                onClick={saveProfile}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <UserCard
          user={{
            firstName,
            lastName,
            about,
            age,
            gender,
            profileURL,
          }}
        />
      </div>
     <div className="toast toast-top toast-center">
       {showToast &&  <div className="alert alert-success">
          <span>Profile edited successfully</span>
        </div>}
        {error && <div className="alert alert-error">
          <span>{error}</span>
        </div>}
      </div>
    </div>
  );
};

export default EditProfile;


