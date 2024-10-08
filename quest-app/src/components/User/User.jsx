import React, {useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import UserActivity from './UserActivity';
import { GetWithAuth } from '../../services/HttpService';

const User = () => {

  const {userId} = useParams();
  const [user, setUser]=useState();  

const getUser =()=>{
  GetWithAuth("/users/" +userId)
  .then(res=>res.json())
  .then((result)=>{
    console.log(result);
    setUser(result);
  },
(error)=>{
  console.log(error);
}
)
}

  useEffect(()=>{
    getUser()
  }, [])

  return (
    <div style={{display:'flex'}}>
      {user? <Avatar avatarId = {user.avatarId} userId={userId} userName={user.userName}/>: ""}
      {localStorage.getItem("currentUser") == userId ? <UserActivity userId={userId}/> : ""}
    </div>
  )
}

export default User
