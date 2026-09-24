import SubredditCard from "./SubredditCard";
import AddModal from "./AddModal";
import { FaReddit } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import { useState } from "react";
function App() {

  const [subreddits,setSubreddits]=useState([
      {id:1,name:"reactjs"},
      {id:2,name:"javascript"},
      {id:3,name:"webdev"}
  ]);
  function deleteSubreddit(id){
    setSubreddits(subreddits.filter(subreddit=>subreddit.id!==id));
  }
    function addSubreddit(name) {
    setSubreddits(previous => [
        ...previous,
        {
            id: crypto.randomUUID(),
            name
        }
    ]);
  }
  
   const [isModalOpen, setIsModalOpen] = useState(false);
   const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <FaReddit className="reddit-logo" />
          <h1>Redditon</h1>
        </div>
      
      <button onClick={()=>setIsModalOpen(true)}> <FaPlus className="add-btn" /></button>
      </header>
      <div className="subreddit-list">
      {subreddits.map(subreddit=>(
            <SubredditCard 
               subreddit={subreddit} 
               key={subreddit.id}
               onDelete={deleteSubreddit}
            />
      ))}
      </div>
   
    {isModalOpen &&
     <AddModal  subreddits={subreddits}
                onAddSubreddit={addSubreddit}
                onClose={closeModal}          />}
    </div>
  );
}

export default App;