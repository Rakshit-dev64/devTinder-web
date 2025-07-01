
import React, { useState } from 'react'
import axios from 'axios'
import { InputField } from './components'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/constants';
import art from '../assets/art.png';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async () => {
      try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password},
      {withCredentials : true}
      )
      console.log(res.data)
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
  }
  catch(err){
    setError(err.response?.data || "Something went wrong");
    console.log(err.response.data)
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
}
  return (
    <div className=" bg-black flex px-16 gap-x-48">
     <div className="max-w-md  text-white pt-30 pl-32">
       <h1 className="text-5xl font-bold mb-8">Create your account</h1>
       <div className="card bg-black shadow-none">
         <div className="card-body p-0">
           <fieldset className="space-y-4">
            <div className='flex gap-3'>
            <div>
               <InputField
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 placeholder={"First Name"}
               />
             </div>
             <div>
               <InputField
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 placeholder={"Last Name"}
               />
             </div>
            </div>
             <div>
               <InputField
                 value={emailId}
                 onChange={(e) => setEmailId(e.target.value)}
                 placeholder={"Email Id"}
               />
             </div>
             <div>
               <InputField
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder={"Password"}
               />
             </div>
            
             <button className="mt-4 w-80 btn btn-ghost text-xl bg-neutral-content text-neutral" onClick={handleSignup}>Signup</button>
             <div className="mt-2">
     <span className="text-sm text-gray-400">
       Existing user?{" "}
       <Link to={"/login"} className="text-blue-400 underline hover:text-blue-500">
         Login here
       </Link>
     </span>
   </div>
           </fieldset>
         </div>
       </div>
     </div>
     <div className="flex items-center justify-center">
     <img src={art} alt="Login Illustration" className="block h-[100%]" />
   </div>
   <div className="toast toast-top toast-center">
        {error && <div className="alert alert-error">
          <span>{error}</span>
        </div>}
      </div>
   </div>
  )
}

export default Signup