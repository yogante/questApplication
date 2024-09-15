import { Button, FormControl,FormHelperText,Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {PostWithAuth } from '../../services/HttpService'


const Auth = () => {

  const [username, setUsername]= useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();

  const handleUsername=(value)=>{
      setUsername(value)
  }

  const handlePassword=(value)=>{
    setPassword(value)
  } 

  const sendRequest = (path)=>{
    console.log(path)
    fetch("/auth/" + path, {
      method:"POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("tokenKey")
        },
        body:JSON.stringify({
            userName:username,
            password:password
         })
    })

    // PostWithAuth("/auth/" + path, {
    //   userName:username,
    //   password:password
    // })
    .then((res)=>res.json())
    // .then((res) => {
    //   // Content-TypeがJSONか確認する
    //   if (res.headers.get("Content-Type").includes("application/json")) {
    //     console.log(res);
        
    //     return res.json();
    //   } else {
    //     throw new Error("Received non-JSON response");
    //   }
    // })
    .then((result)=> {
                     localStorage.setItem("tokenKey", result.message);
                     localStorage.setItem("refreshkey", result.refreshToken)
                     localStorage.setItem("currentUser", result.userId);
                     localStorage.setItem("userName", username);
                    console.log(result);
                    })
    .catch((err)=> console.log(err));

  }


  const handleButton=(path)=>{
    sendRequest(path)
    setUsername("")
    setPassword("")
    navigate("/")
  }
  
  return (
   <>
   <div style={{display:'flex',
    flexFlow:'column',
    width:300,
    margin:'auto'
   }}>
   <FormControl>
    <InputLabel sx={{top:20}}>Username</InputLabel>
    <Input sx={{top:20}} onChange={(i) => handleUsername(i.target.value)} />
  </FormControl>

  <FormControl sx={{marginTop: 4}}>
    <InputLabel sx={{top:60}}>Password</InputLabel>
    <Input sx={{top:60}} onChange={(i) => handlePassword(i.target.value)} />
  </FormControl>

  <Button 
    variant='contained'
    sx={{
      marginTop: 15,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      color: 'white'
    }}
    onClick={() => handleButton("register")}
  >
    Register
  </Button>

  <FormHelperText sx={{margin: 1}}>Are you registered?</FormHelperText>

  <Button 
    variant='contained'
    sx={{
      marginTop: 1,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      color: 'white'
    }}
    onClick={() => handleButton("login")}
  >
    Login
  </Button>
   </div>
  
</>
    )
}

export default Auth
