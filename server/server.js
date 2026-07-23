require("dotenv").config();
console.log("THIS IS THE SERVER FILE I'M EDITING");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Get all posts
app.get("/test", (req, res) => {
    res.send("Test route works!");
});
app.get("/api/posts/:subreddit", async (req, res) => {
    try {
        const subreddit = req.params.subreddit;

const response = await fetch(
    `https://reddit34.p.rapidapi.com/getPostsBySubreddit?subreddit=${subreddit}&sort=new`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.RAPID_API_KEY,
            "x-rapidapi-host": "reddit34.p.rapidapi.com",
            "Content-Type": "application/json"
        }
    }
);

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
