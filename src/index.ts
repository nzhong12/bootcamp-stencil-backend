import express from "express";
import { Db, MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// ====================================================================
// Routes
// ====================================================================

// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/posts", async (req, res) => {
  res.send("TODO: GET /posts");
});

// TODO: Implement a route handler that creates a new post.
app.post("/posts", async (req, res) => {
  res.send("TODO: POST /posts");
});

// TODO: Implement a route handler that gets a post associated with a given postID.
app.get("/posts/:postID", async (req, res) => {
  res.send("TODO: GET /posts/{postID}");
});

// TODO: Implement a route handler that updates the post associated with a given postID.
app.patch("/posts/:postID", async (req, res) => {
  res.send("TODO: PATCH /posts/{postID}");
});

// TODO: Implement a route handler that deletes the post associated with a given postID.
app.delete("/posts/:postID", async (req, res) => {
  res.send("TODO: DELETE /posts/{postID}");
});

// TODO: Implement a route handler that gets all the comments associated with a given postID.
app.get("/posts/:postID/comments", async (req, res) => {
  res.send("TODO: GET /posts/{postID}/comments");
});

// TODO: Implement a route handler that gets adds a comment to the post with the given postID.
app.post("/posts/:postID/comments", async (req, res) => {
  res.send("TODO: POST /posts/{postID}/comments");
});

// TODO: Implement a route handler that gets a comment associated with the given commentID.
app.get("/posts/:postID/comments/:commentID", async (req, res) => {
  res.send("TODO: GET /posts/{postID}/comments/{commentID}");
});

// TODO: Implement a route handler that updates a comment associated with the given commentID.
app.patch("/posts/:postID/comments/:commentID", async (req, res) => {
  res.send("TODO: PATCH /posts/{postID}/comments");
});

// TODO: Implement a route handler that deletes a comment associated with the given commentID.
app.delete("/posts/:postID/comments/:commentID", async (req, res) => {
  res.send("TODO: DELETE /posts/{postID}/comments");
});

// TODO: add more endpoints here!

// Start the Express server.
function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();
