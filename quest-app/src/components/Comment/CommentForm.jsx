import React, { useState } from 'react'
import { CardContent, OutlinedInput, Link, Avatar, InputAdornment, Button } from '@mui/material';

const CommentForm = (props) => {
const{userId, userName, postId} =props;
const [text, setText] = useState("")

const saveComment = ()=>{
  fetch("/comments",
    {method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      postId:postId,
      userId:userId,
      text:text,
    }),
})
.then((res)=>res.json())
.catch((err)=> console.log("error desuuu"))
}

const handleChange= (value)=>{
  setText(value);
}
const handleSubmit=()=>{
  saveComment();
  setText("");
}

  return (
    
    <div>
      <CardContent>
        <OutlinedInput
         id='outlined-abornment-amount'
         multiline
         inputProps={{maxLength: 250}}
         fullWidth
         value={text}
         onChange={(i)=>handleChange(i.target.value)}
         startAdornment={
          <Link sx={{ textDecoration : "none",
            boxShadow : "none",
            color : "white"}} 
            to={{pathname : '/users/' + userId}}>
          <Avatar sx={{ 
            width: (theme)=> theme.spacing(4),
            height:  (theme)=> theme.spacing(4) 
            }}  aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
         }
         endAdornment={
          <InputAdornment position='end'>
              <Button 
              variant="contained"
              style={{
                background:"linear-gradient(45deg,#2196f3 30%, #21cbf3 90%",
                color:'white'
              }}
              onClick={handleSubmit}
              >Comment</Button>
          </InputAdornment>
         }
         style={{color: "black, backgroundcolor:'white"}}
        ></OutlinedInput>
      </CardContent>
    </div>
  )
}

export default CommentForm
