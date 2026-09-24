function Post({ post }) {
    return (
        <div className="subCard">
            <h3>
                <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                </a>
            </h3>
            <p>{post.selftext}</p>
            <p>⬆️ {post.ups}</p>
        </div>
    );
}

export default Post;