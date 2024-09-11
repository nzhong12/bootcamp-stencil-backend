"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config(".env");
const app = (0, express_1.default)();
const port = 8080; // Default port to listen on.
let db;
// Middleware.
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ====================================================================
// Routes
// ====================================================================
// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db
            .collection("posts")
            .find()
            .sort({ createdAt: -1 })
            .toArray();
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Error fetching posts");
    }
}));
// GET /posts: Returns a list of all posts, ordered by date created.
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db
            .collection("posts")
            .find()
            .sort({ createdAt: -1 })
            .toArray();
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Error fetching posts");
    }
}));
// POST /posts: Creates a new post.
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = req.body;
        newPost.createdAt = new Date();
        const result = yield db.collection("posts").insertOne(newPost);
        const insertedPost = yield db
            .collection("posts")
            .findOne({ _id: result.insertedId });
        res.status(201).json(insertedPost);
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
}));
// GET /posts/:postID: Gets a post associated with a given postID.
app.get("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = new mongodb_1.ObjectId(req.params.postID);
        const post = yield db.collection("posts").findOne({ _id: postID });
        if (post) {
            res.json(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Error fetching post");
    }
}));
// PATCH /posts/:postID: Updates the post associated with a given postID.
app.patch("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = new mongodb_1.ObjectId(req.params.postID);
        const updateData = req.body;
        const result = yield db
            .collection("posts")
            .updateOne({ _id: postID }, { $set: updateData });
        if (result.matchedCount > 0) {
            res.send("Post updated successfully");
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Error updating post");
    }
}));
// DELETE /posts/:postID: Deletes the post associated with a given postID.
app.delete("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = new mongodb_1.ObjectId(req.params.postID);
        const result = yield db.collection("posts").deleteOne({ _id: postID });
        if (result.deletedCount > 0) {
            res.send("Post deleted successfully");
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
}));
// GET /posts/:postID/comments: Gets all the comments associated with a given postID.
app.get("/posts/:postID/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = new mongodb_1.ObjectId(req.params.postID);
        const comments = yield db
            .collection("comments")
            .find({ postID })
            .toArray();
        res.json(comments);
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send("Error fetching comments");
    }
}));
// POST /posts/:postID/comments: Adds a comment to the post with the given postID.
app.post("/posts/:postID/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = new mongodb_1.ObjectId(req.params.postID);
        const newComment = req.body;
        newComment.postID = postID;
        newComment.createdAt = new Date();
        const result = yield db.collection("comments").insertOne(newComment);
        const insertedComment = yield db
            .collection("comments")
            .findOne({ _id: result.insertedId });
        res.status(201).json(insertedComment);
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).send("Error adding comment");
    }
}));
// GET /posts/:postID/comments/:commentID: Gets a comment associated with the given commentID.
app.get("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = new mongodb_1.ObjectId(req.params.commentID);
        const comment = yield db
            .collection("comments")
            .findOne({ _id: commentID });
        if (comment) {
            res.json(comment);
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).send("Error fetching comment");
    }
}));
// PATCH /posts/:postID/comments/:commentID: Updates a comment associated with the given commentID.
app.patch("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = new mongodb_1.ObjectId(req.params.commentID);
        const updateData = req.body;
        const result = yield db
            .collection("comments")
            .updateOne({ _id: commentID }, { $set: updateData });
        if (result.matchedCount > 0) {
            res.send("Comment updated successfully");
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send("Error updating comment");
    }
}));
// DELETE /posts/:postID/comments/:commentID: Deletes a comment associated with the given commentID.
app.delete("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = new mongodb_1.ObjectId(req.params.commentID);
        const result = yield db
            .collection("comments")
            .deleteOne({ _id: commentID });
        if (result.deletedCount > 0) {
            res.send("Comment deleted successfully");
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("Error deleting comment");
    }
}));
// TODO: add more endpoints here!
// Start the Express server.
function start() {
    const client = new mongodb_1.MongoClient(process.env.ATLAS_URI);
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
//# sourceMappingURL=index.js.map