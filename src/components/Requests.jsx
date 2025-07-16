import { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { RequestsImg } from "./Illustrations";
import { motion } from "framer-motion";

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
      <div className='flex justify-center items-center flex-col mt-20 sm:mt-14 gap-8 sm:gap-14 animate-fadeIn px-4 min-h-[60vh] lg:mt-8'>
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          No requests found
        </h1>
        <div className='flex justify-center'>
          <RequestsImg/>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center mt-6 sm:mt-8 px-4 text-white font-medium tracking-wide animate-fadeIn">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
        Requests
      </h1>
      <div className="w-full max-w-4xl space-y-3 sm:space-y-4">
        { requests.map((request, index) => {
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
            <motion.div
              key={_id}
              className="list-item-modern p-4 sm:p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex sm:block items-center gap-3 sm:gap-0 w-full sm:w-auto">
                    <img
                      src={profileURL}
                      alt="pfp"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md flex-shrink-0"
                    />
                    <div className="sm:hidden flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-base">
                          {firstName} {lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {age} • {gender}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <div className="hidden sm:flex gap-1.5">
                      <div className="font-semibold text-base">
                        {firstName} {lastName}
                      </div>
                      <div className="text-xs text-right text-gray-500 mt-1.5">
                        {age} • {gender}
                      </div>
                    </div>
                    <div className="text-sm opacity-70 mt-1 sm:mt-0">{about || " "}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {skills && skills.length > 0
                        ? skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="mr-1 sm:mr-2 py-1 px-2 bg-white/10 rounded-full inline-block mb-1 text-xs">
                              {skill}
                            </span>
                          ))
                        : " "}
                    </div>
                  </div>
                  <div className="flex justify-end sm:justify-start items-center gap-2 mt-3 sm:mt-0">
                    <motion.button 
                      className="btn btn-enhanced !text-red-500 btn-sm sm:btn-md"
                      onClick={()=>reviewRequests("rejected",request._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reject
                    </motion.button>
                    <motion.button 
                      className="btn btn-enhanced !text-blue-500 btn-sm sm:btn-md"
                      onClick={()=>reviewRequests("accepted",request._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Accept
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;