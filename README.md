# Just_Post
An Express.js web application with EJS templating and MySQL2 integration to perform basic CRUD operations for posting content.

Database
	•	Database name: justPostDB
	•	Table name: posts
	•	Schema:
           CREATE TABLE posts (
           id VARCHAR(100) PRIMARY KEY NOT NULL,
           username VARCHAR(50) NOT NULL,
           content TEXT NOT NULL,
           more TEXT
           );

Tech Stack
	•	Backend: Node.js, Express.js
	•	Database: MySQL2
	•	Templating: EJS
	•	UUID: For unique post IDs
	•	Middleware: method-override for handling PUT/PATCH/DELETE via forms

Server Setup
 npm install express mysql2 ejs uuid method-override
 node server.js
App runs at: http://localhost:3000

Folder Structure
project-root/
├── public/           # Static files (CSS, JS, images)
├── view/             # EJS templates
│   ├── index.ejs
│   ├── newPost.ejs
│   ├── readMore.ejs
│   └── editPost.ejs
├── server.js         # Main application file
