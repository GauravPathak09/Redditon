import { useState, useEffect } from "react";
import { FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import Post from "./Post";
function SubredditCard({subreddit,onDelete}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    async function fetchPosts() {
        setError("");
        setIsLoading(true);
        try{
    const response = await fetch(
        `http://localhost:3000/api/posts/${subreddit.name}`
    );

    const responseData = await response.json();

    if (!responseData.data?.posts) {
        console.error(responseData);
        setError("API failure , please try later.")
        setPosts([]);
        return;
    }
        
    setPosts(responseData.data.posts);
}
catch(error){
    console.error(error);
    setError("Network Error, Please check your network connection and try again.");
    
}
        finally{
            setIsLoading(false);
        }
}
    const[ posts,setPosts]=useState([]);
    useEffect(() => {
    console.log(`Fetching posts for r/${subreddit.name}`);
    fetchPosts();}, [subreddit.name]);
    return(
        <div className="subreddit-card">
            <div className="subreddit-header">
                <div></div>
            <h2>r/{subreddit.name}</h2>
            <div className="sub-fns">
            <button className="refresh" disabled={isLoading} onClick={fetchPosts}><FiRefreshCw  className={isLoading?"spin":""} /></button>
            <button className="delete" onClick={()=>onDelete(subreddit.id)}><FiTrash2/></button>
           </div>
           </div>

       {isLoading?(
        <p className="loading">
    <FiRefreshCw className="spin" /> Loading...
</p>
       ):error?(
        <p className="error">{error}</p>
       ):(
         posts.map(post => (
    <Post
        key={post.data.id}
        post={post.data}
    />
       )
))}
            
        </div>
    );
}
export default SubredditCard;