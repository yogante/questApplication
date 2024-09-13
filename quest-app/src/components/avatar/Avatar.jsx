import React , {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, List, ListItem, Box, Radio } from '@mui/material';
import { PutWithAuth } from '../../services/HttpService';

const Avatar = (props) => {
  const [open, setOpen] = useState(false);
  const {avatarId, userId} = props;
  const [selectedValue, setSelectedValue] = useState(0);

  const saveAvatar =()=>{
    PutWithAuth("/users/"+ localStorage.getItem("currentUser"), {
      avatar: selectedValue
    })
    .then(res => res.json())
    .catch((err)=> console.log(err))
  }

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {
    setOpen(false);
    saveAvatar()
  };
  
  const handleChange = (event)=>{
    setSelectedValue(event.target.value);
  };

  return (
    <>
    <div>
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 185, margin:10 }}
      image={`/avatars/avatar${selectedValue}.png`}
      title="User Avatar"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Username
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        User Info
      </Typography>
    </CardContent>
    <CardActions>
      {localStorage.getItem("currentUser") == userId ?       <Button size="small" color='primary' onClick={handleOpen}>
        Change Avatar
        </Button> : ""}
    </CardActions>
  </Card>
  <Modal
    style={{display:'flex', maxWidth:'180'}}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <List dense>
      {[1,2,3,4,5,6].map((key)=>{
        const labelId = `checkbox-list-secondary-label-${key}`;
        return(
          <ListItem key={key} button>
          <CardMedia
          style = {{maxWidth: 100}}
          component="img"
          alt={`Avatar n°${key}`}
          image={`/avatars/avatar${key}.png`}
          title="User Avatar"
          />
          <Box sx={{ marginLeft: 'auto' }}>
          <Radio
            edge="end"
            value= {key}
            onChange={handleChange}
            checked={""+selectedValue === ""+key}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </Box>
        </ListItem>
        )


      })}
   
    </List>
  </Modal>
  </div>
  </>
);
     
    
}

export default Avatar
