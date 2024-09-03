import React from 'react'
import { CardContent, OutlinedInput, Link, Avatar } from '@mui/material';

const Comment = (props) => {
const{text, userId, userName} =props;

  
  return (
    
    <div>
      <CardContent>
        <OutlinedInput
         disabled
         id='outlined-abornment-amount'
         multiline
         inputProps={{maxLength: 25}}
         fullWidth
         value={text}
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
        ></OutlinedInput>
      </CardContent>
    </div>
  )
}

export default Comment
