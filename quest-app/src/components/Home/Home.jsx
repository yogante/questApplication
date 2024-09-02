import React,  { useEffect,useState }  from 'react'
import Post from '../Post/Post'
import { Box } from '@mui/material';

const Home = () => {
  const[error, setError]= useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[postList, setPostList]= useState([]);

  useEffect(()=>{
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
  },[])
  
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
        backgroundColor:'#cfe8fc',
        height:'100vh'}}>
   
        {postList.map(post =>(
          <Post title={post.title} text={post.text}></Post>
           
        ))}

        </Box>
      {/* <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'}}>
        
        {postList.map(post =>(
          <Post title={post.title} text={post.text}></Post>
           
        ))}
      </div> */}
    </>
    );
  }
  
}

export default Home
