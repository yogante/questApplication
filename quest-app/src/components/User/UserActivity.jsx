import React, { useEffect, useState, forwardRef } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Post from '../Post/Post';
import { GetWithAuth } from '../../services/HttpService';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUp =(props)=>{
  
  const [isOpen, postId, setIsOpen] = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState(null);
  
  const getPost =()=>{
    fetch("/posts/"+ postId,
      {method:"GET",
      headers:{
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("tokenKey") 
      },
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      setPost(result);
    },
    (error) => {
      console.log(error)
    }
  )
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(()=>{
    setOpen(isOpen);
  }, [isOpen])

  useEffect(()=>{
    getPost();
  }, [postId])


  return(
    post !=null ?
    <React.Fragment>
    <Button variant="outlined" onClick={handleClickOpen}>
      Open full-screen dialog
    </Button>
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Close
          </Typography>
     
        </Toolbar>
      </AppBar>
  
      <Post 
      likes = {post.postLikes} 
      postId = {post.id}
      userId = {post.userId}
      username= {post.userName}
      title={post.title}
      text = {post.text}
      ></Post>
    </Dialog>
  </React.Fragment> 
  : "loading..."


  )

 
}


const UserActivity = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded]= useState(false);
  
  const [rows, setRows] = useState([]);
  const {userId} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const handleNotification =(postId)=>{
    setSelectedPost(postId);
    setIsOpen(true);
  }
  const getActivity = ()=>{
  GetWithAuth("/users/activity/"+ userId)
  .then((res)=>res.json())
  .catch(
    (result) => {
      setIsLoaded(true);
      console.log(result);
      setRows(result);
    },
    (error)=>{
      console.log(error);
      setIsLoaded(true);
      setError(error);
    }
  )
  }

  useEffect(()=>{
    getActivity()
  }, [])


  return (
    <>
    <div>
      {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/> :""}
      <Paper style={{ width: '100%'}}>

      <TableContainer sx={{
        maxHeight: 440,
        minWidth: 100,
        maxWidth: 800,
        marginTop: 50,
      }} component={Paper}
      >
        <Table 
        sx={{ minWidth: 650 }} 
        aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              User Activity
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.map((row) =>{
              return ( 
                <>
                <Button onClick={() => handleNotification(row[1])} >
                  <TableRow
                  hover role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    {row[3] + " " + row[0] + " your post"}
                  </TableCell>
                </TableRow>
                </Button>
                </>
              );
            })},
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination 
      rowsPerPageOptions={[10,25,100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handlechangeRowsPerPage}
      /> */}
      </Paper>
      

      
     
    </div>
    </>
    );
}

export default UserActivity
