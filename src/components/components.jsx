import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import BASE_URL from '../utils/constants';
import axios from 'axios';

export const NavBar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout",{}, {withCredentials : true});
      dispatch(removeUser());
      return navigate("/login")

    }catch(err){
      console.error(err);
    }
    
  }
  return (
      <div className="navbar  bg-[#000] text-white shadow-sm">
  <div className="flex-1">
    <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl bg-neutral-content text-neutral ml-4">CodeBond</Link>
  </div>
  <div className="flex gap-2 items-center">
  {user && (          
    <>
      <h1 className="mt-2">Welcome {user.firstName}</h1>

      <div className="dropdown dropdown-end mx-6" key={user.emailId}>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user.profileURL} />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content bg-neutral rounded-box z-1 mt-3 w-48 p-2 shadow"
        >
          <li>
            <Link to={"/profile"} className="justify-between">
              Profile
              {/* <span className="badge">New</span> */}
            </Link>
          </li>
          <li><Link to={"/connections"}>Connections</Link></li>
          <li><Link to={"/requests"}>Requests</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </>
  )}
</div>

</div>
  )
}

export const InputField = ({value, onChange}) => {
  return(
    <>
    <label className="input mb-7">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
  <input
    type="email" 
    placeholder="Email ID" 
    required
    value={value}
    onChange={onChange}
    />
</label>
</>
  )
}

export const PassWordField = ({value, onChange}) => {
  return(
    <>
    <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    placeholder="Password"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
    value={value}
    onChange={onChange}
  />
</label>
    </>
  )
}