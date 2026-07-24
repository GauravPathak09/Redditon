import { useState } from "react";
import { FiX } from 'react-icons/fi';
function AddModal({subreddits, onAddSubreddit, onClose}) {
    const [subredditName, setSubredditName] = useState("");


  async  function handleAdd(){
          const name = subredditName.trim();

    if (!name) {
        setError("Please enter a subreddit name.");
        return;
    }
      const exists = subreddits.some(
        subreddit =>
            subreddit.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
        setError("Subreddit already exists.");
        return;
    }

    const valid = await isValidSubreddit(name);

    if (!valid) {
        setError("Subreddit not found.");
        return;
    }

        setError("");

        onAddSubreddit(subredditName.trim());
        onClose();
        setSubredditName("");
    }
    const [error, setError] = useState("");
    

async function isValidSubreddit(name) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${name}`)

        const data = await response.json();

        // Backend indicates success and returned posts
        return data.success === true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
   
    return(

        <div className="outer-modal" onClick={onClose}>
            <div className="modal" onClick={(event) => {
            event.stopPropagation();
        }}>
               <div className="modal-header">
        <h2>Add Subreddit</h2>

        <button
            type="button"
            className="close-btn"
            onClick={onClose}
        >
            <FiX />
        </button>
    </div>
         <form onSubmit={(event) => {
            event.preventDefault();
            handleAdd();
                }}>
         <input
             value={subredditName}
                onChange={(event) => {
                          setSubredditName(event.target.value);
    }}
    placeholder="Enter subreddit name"
    />
    
    {<p className="error">{error}</p>}
    
    <div className="modal-actions">
    <button className="cancel" type="button" onClick={onClose}>Cancel</button>     
    <button className="add" type="submit">Add</button>
    </div>
     </form>
</div>
</div>
    )
}
export default AddModal;