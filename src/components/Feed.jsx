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
    <div className='flex justify-center items-center flex-col mt-14 gap-14'>
      <div className='text-4xl font-bold'>No more users found</div>
      <div>
        <TouchGrass/>
      </div>

    </div>
    )
  }



  return (
    feed && (
    <div className='flex justify-center mt-12'>
      <UserCard user = {feed[0]}/>
    </div>
  )
)
}

export default Feed