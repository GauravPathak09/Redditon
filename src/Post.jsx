function Post({ post }) {
    return (
        <div className="subCard">
            <h3>{post.title}</h3>
            <p>{post.selftext}</p>
            <p>⬆️ {post.ups}</p>
        </div>
    );
}

export default Post;