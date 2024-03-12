import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; //原视频第27:52 是怎么做到直接隔空换行的,然后注意为什么是post.title; 不是posts.title
import axios from 'axios';
import Delete from '../img/delete.png';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { AuthContext } from '../context/authContext';

function Todo({ userId, todo, index, completeTodo, undoTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{
                textDecoration: todo.isCompleted
                    ? "line-through"
                    : ""
            }}>
            <div className="checkbox">
                <input type="checkbox"
                    disabled={userId > -1 ? false : true}
                    checked={todo.isCompleted}
                    onChange={e => {
                        if (e.target.checked == true) {
                            completeTodo(index, todo.id);
                        } else {
                            undoTodo(index, todo.id);
                        }
                    }}
                />
                {todo.text}
            </div>
            <div className="img">
                {todo.creatorId == userId
                    ? (
                        <img onClick={() => removeTodo(index, todo.id)} src={Delete} alt="" />
                    )
                    : ""
                }
            </div>
        </div>
    );
}

function TodoForm({ userId, addTodo }) {
    const [value,
        setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value)
            return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                disabled={userId > -1 ? false : true}
                type="text"
                className="add-task-form"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Press enter to add a new task" />
        </form>
    );
}

const Home = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const userId = currentUser ? currentUser.id : -1;
    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(`ws://localhost:8801/api/message/${userId}`);

    const userName = currentUser ? currentUser.username : "Guest"

    const [todos, setTodos] = React.useState([]);
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/todo/`);
                setTodos(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(`Connection state changed`);

    }, [readyState]);

    useEffect(() => {
        console.log(`Got a new message: `);
        console.log(lastJsonMessage);
        const msg = { ...lastJsonMessage };
        handleMessage(msg);
    }, [lastJsonMessage]);

    const handleMessage = (msg) => {
        const from = msg.from;
        const data = msg.data;
        const message = msg.message;

        if (message == 'delete') {
            const id = parseInt(data);
            const newTodos = [...todos];
            const index = newTodos.findIndex((todo) => todo.id === id);
            if (index > -1) {
                newTodos.splice(index, 1);
                setTodos(newTodos);
            }
        }

        if (message == 'update') {
            const newTodo = data;
            const id = parseInt(newTodo.id);
            const newTodos = [...todos];
            const index = newTodos.findIndex((todo) => todo.id === id);
            if (index > -1) {
                newTodos[index] = newTodo;
                setTodos(newTodos);
            }
        }

        if (message == 'create') {
            const newTodo = data;
            const newTodos = [
                ...todos,
                newTodo
            ];
            setTodos(newTodos);
        }
    }

    const addTodo = async text => {
        try {
            const res = await axios.post(`/api/todo/`, { name: text });
            const newTodos = [
                ...todos,
                res.data
            ];
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const completeTodo = async (index, id) => {
        try {
            const res = await axios.put(`/api/todo/${id}`, { isCompleted: true });
            const newTodos = [...todos];
            newTodos[index] = res.data;
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const undoTodo = async (index, id) => {
        try {
            const res = await axios.put(`/api/todo/${id}`, { isCompleted: false });
            const newTodos = [...todos];
            newTodos[index] = res.data;
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const removeTodo = async (index, id) => {
        try {
            const res = await axios.delete(`/api/todo/${id}`);
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="app">
            <h1 className="title">
                Hello, dear {userName} :)
                {userId > -1 ? (
                    <Link className="login-button" onClick={logout}>Logout</Link>
                ) : (
                    <Link className="login-button" to="/login">Login</Link>
                )}
                <br />Welcome to My Todos!
            </h1>
            <div className="todo-list justify-center">
                {todos.map((todo, index) => (<Todo
                    userId={userId}
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    undoTodo={undoTodo}
                    removeTodo={removeTodo} />))}
                <TodoForm userId={userId} addTodo={addTodo} />
            </div>
            <div className="connection">
                Connecting status to server: {connectionStatus}.
            </div>
            <div className="buttons"></div>
        </div>
    );
}

export default Home