import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Comment from '../Comment/Comment';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Container, Card } from '@mui/material';
import CommentForm from '../Comment/CommentForm';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {transform: 'rotate(0deg)'},
    },
    { props: ({ expand }) => !!expand,},
  ],
}));

const Post = (props) => {
  const {title, text, userId, userName, postId, likes}= props;

  const [expanded, setExpanded] = useState(false);
  const[error, setError]= useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[commentList, setCommentList]= useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);

  const [refresh, setRefresh] =useState(false);
  const [likeId, setLikeId] = useState(null);
  let disabled =false;

  const setCommentRefresh=()=>{
    setRefresh(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike =()=>{
    setIsLiked(!isLiked);
    if (isLiked) {
      saveLike();
      setLikeCount(likeCount +1);
    } else{
      deleteLike();
      setLikeCount(likeCount -1);
    }

  }
  
  const refreshComments = () =>{
    fetch("/comments?postId=" + postId)
    .then(res => res.json())
    .then(
      (result) =>{
        setIsLoaded(true);
        setCommentList(result)
      },
      (error)=>{
        console.log(error);
        setIsLoaded(true);
        setError(error);
      })

  }

  const saveLike = ()=>{
    fetch("/likes",
      {method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        postId:postId,
        userId:userId,
      }),
  })
    .then((res)=>res.json())
    .catch((err)=> console.log(err))
  }

  const deleteLike = ()=>{
    console.log(likeId);
    fetch("/likes"+likeId,
      {method:"DELETE"}
    )
    .then((res)=>res.json())
    .catch((err)=> console.log(err))
  }
   
  const checkLikes = () =>{
    var likeControl= likes.find((like => like.userId === userId));
    if (likeControl!=null) {
      setLikeId(likeControl.id);
      
      setIsLiked(true);
    }
  }

  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current=false;
    }
    else{
      refreshComments();
    }
  },[commentList])
  



  useEffect(() => {checkLikes()}, [])

  return(
    <>
    <div className='postContainer'>
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
          <Avatar style={{ background:"linear-gradient(45deg,#2196f3 30%, #21cbf3 90%" }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {disabled ? 
        <IconButton 
        disabled
        onClick={handleLike}
        aria-label="add to favorites">
          <FavoriteIcon style ={ isLiked? {color:'red'} :null } />
        </IconButton>:
        <IconButton
        onClick={handleLike}
        aria-label="add to favourites"
        >
          <FavoriteIcon style ={ isLiked? {color:'red'} :null } />
        </IconButton>
      } 
      {likeCount}

      

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container>
           {error? "error" :
                    isLoaded? commentList.map(comment => (
                      <Comment userId = {1} userName = {"useruser"} text = {comment.text}></Comment>
                    )) : "Loading"}
                    <CommentForm userId = {1} userName = {"useruser"} postId = {postId} setCommentRefresh={setCommentRefresh}></CommentForm>
        </Container>
      </Collapse>
    </Card>
    
    </div>
  </>
  )
}

export default Post
