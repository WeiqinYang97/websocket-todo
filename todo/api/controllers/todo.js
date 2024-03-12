import { db } from "../db.js";
import { wsUsers } from "../context/ws-users.js";
import jwt from "jsonwebtoken";

const formatTodo = (todo) => {
    return {
        id: todo.id,
        text: todo.name,
        isCompleted: todo.is_done == 0 ? false : true,
        deadline: todo.deadline,
        completedAt: todo.done_at,
        creatorId: todo.creatorId,
        updaterId: todo.updaterId,
        createdAt: todo.created_at,
        deletedAt: todo.deleted_at,
        createdBy: todo.createdBy,
        doneBy: todo.doneBy,
        undoBy: todo.undoBy
    }
}

const alertCreate = (creatorId, todo) => {
    Object.keys(wsUsers).forEach(userId => {
        if (userId === creatorId) {
            return;
        }

        wsUsers[userId].forEach((client) => {
            client.send(JSON.stringify({
                from: "server",
                message: "create",
                data: {...todo}
            }))
        })
    })
}

const alertUpdate = (updaterId, todo) => {
    Object.keys(wsUsers).forEach(userId => {
        if (userId === updaterId) {
            return;
        }

        wsUsers[userId].forEach((client) => {
            client.send(JSON.stringify({
                from: "server",
                message: "update",
                data: {...todo}
            }))
        })
    })
}

const alertDelete = (updaterId, deletedId) => {

    console.log("send message to alert delete...");
    console.log(updaterId, deletedId);
    Object.keys(wsUsers).forEach(userId => {

        console.log(userId);
        if (userId === updaterId) {
            return;
        }

        wsUsers[userId].forEach((client) => {

            console.log(`send message to user ${userId}`);
            client.send(JSON.stringify({
                from: "server",
                message: "delete",
                data: deletedId
            }))
        })
    })
}


export const getTodos = (req, res) => {
    console.log(wsUsers);
    // let data = [
    //     {
    //         text: "Learn about React",
    //         isCompleted: false
    //     }, {
    //         text: "Meet friend for lunch",
    //         isCompleted: false
    //     }, {
    //         text: "Build really cool todo app",
    //         isCompleted: false
    //     }
    // ];
    // return res.status(200).json(data);
    const q = "SELECT \
        todos.`id`, \
        todos.`name`, \
        todos.is_done, \
        todos.deadline, \
        todos.done_at, \
        todos.created_at, \
        todos.updated_at, \
        todos.deleted_at, \
        c1.id AS creatorId, \
        c1.nickname AS createdBy, \
        d1.nickname AS doneBy, \
        u1.nickname AS undoBy \
    FROM \
        `todos` \
    LEFT JOIN todo_user ON todos.id = todo_user.todo_id \
    LEFT JOIN users AS c1 ON todo_user.created_by = c1.id \
    LEFT JOIN users AS d1 ON todo_user.done_by = d1.id \
    LEFT JOIN users AS u1 ON todo_user.undo_by = u1.id \
    WHERE todos.deleted_at is null";

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);
        const result = data.map(task => {return formatTodo(task)});
        return res.status(200).json(result);
    });
};
export const getTodo = (req, res) => {
    const q = "SELECT \
        todos.`id`, \
        todos.`name`, \
        todos.is_done, \
        todos.deadline, \
        todos.done_at, \
        todos.created_at, \
        todos.updated_at, \
        todos.deleted_at, \
        c1.id AS creatorId, \
        c1.nickname AS createdBy, \
        d1.nickname AS doneBy, \
        u1.nickname AS undoBy \
    FROM \
        `todos` \
    LEFT JOIN todo_user ON todos.id = todo_user.todo_id \
    LEFT JOIN users AS c1 \
    ON \
        todo_user.created_by = c1.id \
    LEFT JOIN users AS d1 \
    ON \
        todo_user.done_by = d1.id \
    LEFT JOIN users AS u1 \
    ON \
        todo_user.undo_by = u1.id \
    WHERE todos.id = ? AND todos.deleted_at is null";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(formatTodo(data[0]));
    })
};
export const addTodo = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // insert todo
        let name = req.body.name;
        const q = "INSERT INTO `todos` (`id`, `name`, `is_done`, `deadline`, `done_at`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, ?, '0', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);";

        db.query(q, [name], (err, data) => {
            if (err) return res.status(403).json("Create task failed!");

            const newTaskId = data.insertId;
            const q2 = "INSERT INTO `todo_user` (`todo_id`, `created_by`, `updated_by`) VALUES (?, ?, ?);";
            db.query(q2, [newTaskId, userInfo.id, userInfo.id], (err, data) => {
                if (err) return res.status(403).json("Create task failed!");

                const q3 = "SELECT \
                    todos.`id`, \
                    todos.`name`, \
                    todos.is_done, \
                    todos.deadline, \
                    todos.done_at, \
                    todos.created_at, \
                    todos.updated_at, \
                    todos.deleted_at, \
                    c1.id AS creatorId, \
                    c1.nickname AS createdBy, \
                    d1.nickname AS doneBy, \
                    u1.nickname AS undoBy \
                FROM \
                    `todos` \
                LEFT JOIN todo_user ON todos.id = todo_user.todo_id \
                LEFT JOIN users AS c1 \
                ON \
                    todo_user.created_by = c1.id \
                LEFT JOIN users AS d1 \
                ON \
                    todo_user.done_by = d1.id \
                LEFT JOIN users AS u1 \
                ON \
                    todo_user.undo_by = u1.id \
                WHERE todos.id = ? AND todos.deleted_at is null";

                db.query(q3, [newTaskId], (err, data) => {
                    if (err) return res.status(500).json(err);

                    const newTodo = formatTodo(data[0]);

                    alertCreate(userInfo.id, newTodo);

                    return res.status(200).json(newTodo);
                })
            });
        });
    });
};
export const deleteTodo = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const id = req.params.id

        const q = "UPDATE `todos` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `todos`.`id` = ? AND `todos`.`deleted_at` is null;";

        db.query(q, [id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your task!");

            const q2 = "UPDATE `todo_user` SET `deleted_at` = CURRENT_TIMESTAMP, `deleted_by` = ? WHERE `todo_user`.`todo_id` = ? AND deleted_at is null;";

            db.query(q2, [userInfo.id, id], (err, data) => {
                if (err) return res.status(403).json("Delete task failed!");
                alertDelete(userInfo.id, id);
                return res.status(200).json({
                    message: "Task has been deleted!"
                });
            })

        });
    });
};
export const updateTodo = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const todo_id = req.params.id;
        const is_done = req.body.isCompleted == true ? 1 : 0;
        let q1, q2;
        let q1params, q2params;
    
        if (is_done == 0) {
            // from done to undo
            q1 = "UPDATE `todos` SET `is_done` = ?, `updated_at` = CURRENT_TIMESTAMP, done_at = NULL WHERE `todos`.`id` = ? \
            AND `todos`.`done_at` is not null \
            AND `todos`.`deleted_at` is null;";
            q1params = [is_done, todo_id];
    
            q2 = "UPDATE `todo_user` SET \
            `updated_at` = CURRENT_TIMESTAMP, \
            `updated_by` = ?, \
            `undo_by` = ?, \
            `done_by` = NULL \
            WHERE `todo_user`.`todo_id` = ? \
            AND deleted_at is null;";
            q2params = [userInfo.id, userInfo.id, todo_id];
    
        } else {
            // from undo to done
            q1 = "UPDATE `todos` SET \
            `is_done` = ?, \
            `updated_at` = CURRENT_TIMESTAMP, \
            done_at = CURRENT_TIMESTAMP \
            WHERE `todos`.`id` = ? \
            AND `todos`.`done_at` is null \
            AND `todos`.`deleted_at` is null;";
            q1params = [is_done, todo_id];
    
            q2 = "UPDATE `todo_user` SET \
            `updated_at` = CURRENT_TIMESTAMP, \
            `updated_by` = ?, \
            `undo_by` = NULL, \
            `done_by` = ? \
            WHERE `todo_user`.`todo_id` = ? \
            AND deleted_at is null;";
            q2params = [userInfo.id, userInfo.id, todo_id];
        }
    
        db.query(q1, q1params, (err, data) => {
            if (err) return res.status(403).json("Update failed!");
    
            db.query(q2, q2params, (err, data) => {
                if (err) return res.status(403).json("Update failed!");
                
                const q3 = "SELECT \
                    todos.`id`, \
                    todos.`name`, \
                    todos.is_done, \
                    todos.deadline, \
                    todos.done_at, \
                    todos.created_at, \
                    todos.updated_at, \
                    todos.deleted_at, \
                    c1.id AS creatorId, \
                    c1.nickname AS createdBy, \
                    d1.nickname AS doneBy, \
                    u1.nickname AS undoBy \
                FROM \
                    `todos` \
                LEFT JOIN todo_user ON todos.id = todo_user.todo_id \
                LEFT JOIN users AS c1 \
                ON \
                    todo_user.created_by = c1.id \
                LEFT JOIN users AS d1 \
                ON \
                    todo_user.done_by = d1.id \
                LEFT JOIN users AS u1 \
                ON \
                    todo_user.undo_by = u1.id \
                WHERE todos.id = ? AND todos.deleted_at is null";
    
                db.query(q3, [todo_id], (err, data) => {
                    if (err) return res.status(500).json(err);

                    const newTodo = formatTodo(data[0]);

                    alertUpdate(userInfo.id, newTodo);

                    return res.status(200).json(newTodo);
                });
            })
        });
    });

};

