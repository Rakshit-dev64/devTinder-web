import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';
import { TouchGrass } from './Illustrations';

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  // const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async() => {
    if (feed) return;
    try{
      const res = await axios.get(BASE_URL + "/user/feed", {withCredentials : true});
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err);
    }
  };
  useEffect(()=>{
    getFeed();
  },[]);

  if(feed == null) return;
  if(feed.length == 0){
    return (
    <div className='flex justify-center items-center flex-col mt-20 lg:mt-8 gap-8 sm:gap-14 px-4 min-h-[60vh]'>
      <div className='text-2xl sm:text-4xl font-bold text-center'>No more users found</div>
      <div className='flex justify-center'>
        <TouchGrass/>
      </div>

    </div>
    )
  }



  return (
    feed && (
    <div className='flex justify-center items-center px-4 min-h-[calc(100vh-80px)] sm:min-h-0 sm:mt-12'>
      <div className='animate-fade-in'>
        <UserCard key={feed[0]?._id} user = {feed[0]}/>
      </div>
    </div>
  )
)
}

export default Feed