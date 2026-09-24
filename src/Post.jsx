function Post({ post }) {
     const [expanded, setExpanded] = useState(false);
    return (
        <div className="subCard">
            <h3>
                <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                </a>
            </h3>
            <p className={`post-text ${expanded ? "expanded" : ""}`}>
                {post.selftext}
            </p>

            {post.selftext && post.selftext.length > 150 && (
                <button
                    className="see-more"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "See less" : "See more"}
                </button>
            )}

            <p>⬆️ {post.ups}</p>
        </div>
    );
}

export default Post;