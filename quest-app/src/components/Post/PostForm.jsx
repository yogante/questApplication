import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
//   variants: [
//     {
//       props: ({ expand }) => !expand,
//       style: {
//         transform: 'rotate(0deg)',
//       },
//     },
//     {
//       props: ({ expand }) => !!expand,

//     },
//   ],
// }));

const PostForm = (props) => {
  const { userId, userName, refreshPosts}= props;
  const [text, setText]= useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent]= useState(false);
  
  const savePost = ()=>{
    fetch("/posts",
      {method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        userId:userId,
        title:title,
        text:text,
      }),
  })
  .then((res)=>res.json())
  .catch((err)=> console.log("error desuuu"))
  }


  
  const handleSubmit=()=>{
    console.log(text, title)
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  }

  const handleTitle=(value)=>{
    setTitle(value)
    setIsSent(false);
  }

  const handleText = (value)=>{
    setText(value)
    setIsSent(false);
  }

  
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };
  return(


    <div className='postContainer'>
      <Snackbar
        open={isSent}
        autoHideDuration={1200}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success'>
          Your post is sent.
        </Alert>
      </Snackbar>
      
      <Card sx={{ 
        width: 800,
        textAlign:"left",
        margin: 3 }}>
      <CardHeader
        avatar={
          <Link sx={{ textDecoration : "none",
            boxShadow : "none",
            color : "white"}} 
            to={{pathname : '/users/' + userId}}>
          <Avatar style={{ background:"linear-gradient(45deg,#2196f3 30%, #21cbf3 90%" }}  aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        title={
          <OutlinedInput 
          id='outlined-abornment-amount'
          multiline 
          placeholder='title'
          inputProps={{maxLength: 25}}
          fullWidth
          value={title}
          onChange={(i)=>handleTitle(i.target.value)}
          >
          </OutlinedInput>
        }
      ></CardHeader>
      <CardContent>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary' }}
        >
          <OutlinedInput 
          id='outlined-abornment-amount'
          multiline 
          placeholder='text'
          inputProps={{maxLength: 250}}
          fullWidth
          value={text}
          onChange={(i)=>handleText(i.target.value)}
          endAdornment={
            <InputAdornment>
              <Button 
              variant="contained"
              style={{
                background:"linear-gradient(45deg,#2196f3 30%, #21cbf3 90%",
                color:'white'
              }}
              onClick={handleSubmit}
              >Post</Button>
            </InputAdornment>
          }
          >
          </OutlinedInput>
        </Typography>
      </CardContent>
     

    </Card>
    
    </div>
  )
}

export default PostForm
