import React, { useEffect } from 'react';
import { NavBar } from './components';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import BASE_URL from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const fetchUser = async () => {
    if(user) return;
    try{
      const res = await axios.get(BASE_URL + "/profile",
      {withCredentials : true})
      dispatch(addUser(res.data))
    }catch(err){
      if(err.status == 401){
        navigate("/login")
      }
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
