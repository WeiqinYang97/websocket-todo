import express from "express";
import expressWs from "express-ws";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import todoRoutes from "./routes/todos.js"
import messageRoutes from "./routes/message.js";
import cookieParser from "cookie-parser"
import multer from "multer";

const app = express()
expressWs(app);

app.use(express.json())
app.use(cookieParser())

let wsUsers = [];

const upload = multer({ dest: './uploads/' })

app.post('/api/upload', upload.single('file'), function (req, res) {
    res.status(200).json("Image has been uploaded.")
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)
app.use("/api/message", messageRoutes)


const port = process.argv.slice(2)[0] || 8800;

app.listen(port, () => {
    console.log(`Connected! Server is running on port ${port}`);
});


// scp -i /Users/yangweiqin/Desktop/my-react-key.pem /Users/yangweiqin/dumps/Dump20240308/blog_users.sql ubuntu@ec2-13-211-255-133.ap-southeast-2.compute.amazonaws.com:/home/ubuntu/Blog/Blog_/mysql/blog_users.sql


// scp -i /Users/yangweiqin/Desktop/my-react-key.pem /Users/yangweiqin/dumps/Dump20240308/blog_posts.sql ubuntu@ec2-13-211-255-133.ap-southeast-2.compute.amazonaws.com:/home/ubuntu/Blog/Blog_/mysql/blog_posts.sql


// mysql -u username -p database_name < /path/where-to-save/database.sql



// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
// FLUSH PRIVILEGES;

// mysql -u root -p blog < /home/ubuntu/Blog/Blog_/mysql/blog_posts.sql

// mysql -u root -p blog < /home/ubuntu/Blog/Blog_/mysql/blog_users.sql


// nohup "npm start" > api.log 2>&1 &

// nohup "npm run dev" > client.log 2>&1 &

// pm2 start npm --name blogapi -- start
// pm2 start npm --name blogclient -- run dev





//todo项目本地跑通流程：先把sql import到mysql workstation新的todo schema里，然后客户端 api端 npm install；然后客户端 npm run dev；api 端 npm start;

//todo项目到aws：

// scp -i /Users/yangweiqin/Desktop/my-react-key.pem /Users/yangweiqin/Desktop/websocket-todo\ 2 ubuntu@ec2-13-211-255-133.ap-southeast-2.compute.amazonaws.com:/home/ubuntu/todo



// pm2 start npm --name "todo-client" --max-restarts 10 --cwd "/home/ubuntu/todo/todo/client" -- run dev


// pm2 start "/home/ubuntu/todo/todo/api/index.js" --name "todo-api" --max-restarts 10 -- --port 8801




// pm2 start npm --name "blog-client" --max-restarts 10 --cwd "/home/ubuntu/Blog/Blog_/client" -- run dev
// pm2 start "/home/ubuntu/Blog/Blog_/api/index.js" --name "blog-api" --max-restarts 10  -- --port 7700

