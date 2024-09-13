import React,  { useEffect,useState }  from 'react'
import Post from '../Post/Post'
import { Box } from '@mui/material';
import PostForm from '../Post/PostForm';

const Home = () => {
  const[error, setError]= useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[postList, setPostList]= useState([]);
  
  const refreshPosts= ()=>{
    fetch("/posts/all")
    .then(res => res.json())
    // .then((res) => {
    //   // Content-TypeがJSONか確認する
    //   if (res.headers.get("Content-Type").includes("application/json")) {
    //     console.log(res);
        
    //     return res.json();
    //   } else {
    //     throw new Error("Received non-JSON response");
    //   }
    // })
    .then(
      (result) =>{
        setIsLoaded(true);
        setPostList(result);
        
      },
      (error)=>{
        
        setIsLoaded(true);
        setError(error);
      })
  }


  useEffect(()=>{
    refreshPosts()
  },[])
  
  if (error) {
    return <div> error desuyo!!!
       <p>{localStorage.getItem("tokenKey")}</p>
    </div>
   
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
          {localStorage.getItem("currentUser") == null ? "" 
          : <PostForm
          userId= {localStorage.getItem("currentUser")}
          userName={localStorage.getItem("username")}
          refreshPosts = {refreshPosts}
         />
         
        }
          
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
