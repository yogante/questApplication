import React from 'react'
import { useParams } from 'react-router-dom';

const User = () => {

  
  const {userId} = useParams();

  return (
    <div>
      UserId is : {userId}
    </div>
  )
}

export default User
