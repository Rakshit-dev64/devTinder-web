import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import BASE_URL from '../utils/constants';
import axios from 'axios';
import { resetFeed } from '../utils/feedSlice';

export const NavBar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout",{}, {withCredentials : true});
      dispatch(removeUser());
      dispatch(resetFeed());
      return navigate("/login")

    }catch(err){
      console.error(err);
    }
    
  }
  return (
      <div className="navbar navbar-modern text-white shadow-sm">
  <div className="flex-1">
    <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl bg-neutral-content text-neutral ml-4">DevLink</Link>
  </div>
  <div className="flex gap-2 items-center">
  {user && (          
    <>
      <h1 className="mt-2">Welcome {user.firstName}</h1>

      <div className="dropdown dropdown-end mx-6 bg-rgba(23, 23, 23, 0.95)" key={user.emailId}>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user.profileURL} />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-b-lg z-1 mt-3 w-48 p-2 shadow bg-[rgba(23,23,23,0.95)]"
        >
          <li>
            <Link to={"/profile"} className="justify-between">
              Profile
              {/* <span className="badge">New</span> */}
            </Link>
          </li>
           <li><Link to={"/"}>Feed</Link></li>
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

export const InputField = ({value, onChange, placeholder, type, onKeyDown}) => {
  return(
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
  )
}