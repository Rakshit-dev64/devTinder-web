import React, { useState } from 'react'
import axios from 'axios'
import { InputField, PassWordField } from './components'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("rakshit@gmail.com");
  const [password, setPassword] = useState("Rakshit@998");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
      try{
      const res = await axios.post(BASE_URL + "/login", {emailId, password},
      {withCredentials : true}
      )
      dispatch(addUser(res.data));
      return navigate("/");
  }
  catch(err){
    setError(err.response?.data || "Something went wrong");
    console.log(error);
    }
}

  return (
   <div className='flex justify-center mt-32 card-xl'>
    <div className="card bg-neutral w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center mb-5">Login</h2>
    <InputField value={emailId} onChange={(e)=>{setEmailId(e.target.value)}}/>
    <PassWordField value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    <p className='text-red-500 text-sm mt-1 mb-1 min-h-[1.25rem]'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
   </div>
  )
}

export default Login