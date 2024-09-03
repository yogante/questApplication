import React,  { useEffect,useState }  from 'react'
import Post from '../Post/Post'
import { Box } from '@mui/material';
import PostForm from '../Post/PostForm';

const Home = () => {
  const[error, setError]= useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[postList, setPostList]= useState([]);
  
  const refreshPosts=()=>{
    fetch("/posts/all")
    .then(res => res.json())
    .then(
      (result) =>{
        setIsLoaded(true);
        setPostList(result)
        
      },
      (error)=>{
        setIsLoaded(true);
        setError(error);
      })
  }


  useEffect(()=>{
    refreshPosts()
  },[postList])
  
  if (error) {
    return <div> error !!!</div>
  } else if (!isLoaded){
    return <div>Loading !!!</div>

  } else {
    return(
        <>
        <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#f0f5ff'
        }}>
          <PostForm
          userId= {1}
          userName={"nnome"}
          refreshPosts = {refreshPosts}
         />
        {postList.map(post =>(
          <Post 
          likes={post.postLikes}
          postId={post.postId}
          userId= {post.userId} 
          userName={post.userName} 
          title={post.title} 
          text={post.text}
          ></Post>
           
        ))}

        </Box>


        
      {/* <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'}}>
        
        {postList.map(post =>(
          <Post title  ={post.title} text={post.text}></Post>
           
        ))}
      </div> */}
    </>
    );
  }
  
}

export default Home
