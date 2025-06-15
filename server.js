const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const path = require('path');
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'kushal@RVU', 
    database: 'justPostDB'
});

db.connect((err) => {
    if (err) {
        console.error("DB Connection Error:", err);
    } else {
        console.log("Connected to MySQL (justPostDB)");
    }
});

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

//index route api
app.get('/post', (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) return res.status(500).send("Database error");
        res.render("index.ejs", { posts: results });
    });
});

//new post api
app.get('/post/new', (req, res) => {
    res.render("newPost.ejs");
})

//get info from newPost.ejs api
app.post('/posts', (req, res) => {
    const { username, content, more } = req.body;
    const id = uuidv4();
    const query = "INSERT INTO posts (id, username, content, more) VALUES (?, ?, ?, ?)";
    db.query(query, [id, username, content, more], (err) => {
        if (err) return res.status(500).send("Insert failed");
        res.redirect('/post');
    });
});

//to display single post api
app.get('/post/:id', (req, res) => {
    const postID = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", [postID], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Post not found");
        res.render("readMore.ejs", { post: results[0] });
    });
});

//post edit api
app.get('/post/:id/edit', (req, res) => {
    const postID = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", [postID], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Post not found");
        res.render("editPost.ejs", { post: results[0] });
    });
});

//update post after edit api
app.patch('/post/:id', (req, res) => {
    const postID = req.params.id;
    const { username, content, more } = req.body;
    const query = "UPDATE posts SET content = ?, more = ? WHERE id = ?";
    db.query(query, [content, more, postID], (err) => {
        if (err) return res.status(500).send("Update failed");
        res.redirect(`/post/${postID}`);
    });
});

//delete post api
app.delete('/post/:id', (req, res) => {
    const postID = req.params.id;
    db.query("DELETE FROM posts WHERE id = ?", [postID], (err) => {
        if (err) return res.status(500).send("Delete failed");
        res.redirect('/post');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

