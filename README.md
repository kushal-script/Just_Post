# Just_Post
An Express.js web application with EJS templating and MySQL2 integration to perform basic CRUD operations for posting content.  
  
Database  
	•Database name: justPostDB  
	•Table name: posts
	•Schema:  
           CREATE TABLE posts (  
           id VARCHAR(100) PRIMARY KEY NOT NULL,  
           username VARCHAR(50) NOT NULL,  
           content TEXT NOT NULL,  
           more TEXT  
           );  
  
Tech Stack  
	•Backend: Node.js, Express.js  
	•Database: MySQL2  
	•Templating: EJS  
	•UUID: For unique post IDs  
	•Middleware: method-override for handling PUT/PATCH/DELETE via forms  
   
Server Setup  
 •npm install express mysql2 ejs uuid method-override  
 •node server.js  
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
├── package.json  
├── .env  
└── README.md  
  
API Endpoints  
  
1. GET /post  
•Description: Fetch all posts from the database  
•Renders: index.ejs with list of posts  
  
2. GET /post/new  
•Description: Displays the form to create a new post  
•Renders: newPost.ejs  
  
3. POST /posts  
•Description: Submits new post data to the database  
•Body Params:  
•username: String  
•content: String  
•more: String  
•Redirects to: /post  
  
4. GET /post/:id  
•Description: View a single post  
•Renders: readMore.ejs  
•Error: 404 if post not found  
  
5. GET /post/:id/edit  
•Description: Load post data into edit form  
•Renders: editPost.ejs  
•Error: 404 if post not found  
  
6. PATCH /post/:id  
•Description: Update the post content and “more” field  
•content: String  
•more: String  
•Redirects to: /post/:id
  
8. DELETE /post/:id  
•Description: Deletes a post from the database  
•Redirects to: /post  
