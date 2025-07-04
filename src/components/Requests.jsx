import { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { RequestsImg } from "./Illustrations";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async(status, _id) => {
    const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials : true});
    dispatch(removeRequest(_id));
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if(requests.length == 0){
    return(
       <div className='flex justify-center items-center flex-col mt-14 gap-28'>
      <h1 className="text-4xl font-bold">No requests found</h1>
      <div>
        <RequestsImg/>
      </div>
  
    </div>
    )
  } 
  return (
    <div>
      <div className="flex flex-col items-center mt-8 px-4 text-white font-medium tracking-wide">
        <h1 className="text-2xl font-bold mb-6">Requests</h1>
        <ul className="bg-[#000] rounded-box shadow-md w-full max-w-3xl">
          { requests.map((request) => {
            const {
              firstName = "",
              lastName = "",
              profileURL = "",
              age = "",
              gender = "",
              about = "",
              skills = [],
              _id = ""
            } = request.fromUserId || {};
            return (
              <li
                key={_id}
                className="list-row border-b border-base-200 p-4 hover:bg-neutral-950 transition h-36 pl-10 pt-8"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={profileURL}
                      alt="pfp"
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex gap-1.5">
                        <div className="font-semibold text-base">
                          {firstName} {lastName}
                        </div>
                        <div className="text-xs text-right text-gray-500 mt-1.5">
                          {age} • {gender}
                        </div>
                      </div>
                      <div className="text-sm opacity-70">{about || " "}</div>
                      <div className="text-xs opacity-70">
                        {skills && skills.length > 0
                          ? skills.map((skill, index) => (
                              <span key={index} className="mr-2 py-1">
                                {skill}
                              </span>
                            ))
                          : " "}
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <button className="btn btn-neutral-content text-red-500 hover:bg-red-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95 mx-2"
                      onClick={()=>reviewRequests("rejected",request._id)}>
                        Reject
                      </button>
                      <button className="btn btn-neutral-content text-blue-500 hover:bg-blue-500 hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95"
                       onClick={()=>reviewRequests("accepted",request._id)}>
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
