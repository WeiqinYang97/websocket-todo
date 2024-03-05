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


app.listen(8800, () => {
    console.log("Connected!")
})