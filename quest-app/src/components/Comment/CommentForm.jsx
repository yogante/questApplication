import React, { useState } from 'react'
import { CardContent, OutlinedInput, Link, Avatar, InputAdornment, Button } from '@mui/material';
import { PostWithAuth, RefreshToken } from '../../services/HttpService';
import {useNavigate} from 'react-router-dom';


const CommentForm = (props) => {
const{userId, userName, postId, setCommentRefresh} =props;
const [text, setText] = useState("")
let navigate = useNavigate();

const logout =()=>{
  localStorage.removeItem("tokenKey")
  localStorage.removeItem("currentUser")
  localStorage.removeItem("trfreshKey")
  localStorage.removeItem("userName")
  navigate(0)
}


const saveComment = ()=>{
  PostWithAuth("/comments",{
    postId:postId,
    userId:userId,
    text:text,
  })
  .then((res)=> {
    if (!res.ok){
      RefreshToken()
      .then((res) => {if(!res.ok){
        logout()
      } else {
        res.json()
      }})
      .then((result)=> {
        if(result != undefined){
          localStorage.setItem("tokenKey", result.message);
          saveComment()
        }})
      .catch((err)=>{
        console.log(err)
      });
    } else 
    res.json()
  })
  .catch((err)=> {
    if(err == "Unauthorized"){
      
    }
  })
}

const handleSubmit=()=>{
  saveComment();
  setText("");
  setCommentRefresh();
}

const handleChange= (value)=>{
  setText(value);
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
