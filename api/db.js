import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "todo",
    password: "123456",
    database: "todo"
})