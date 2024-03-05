import React, {useEffect, useState, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom'; //原视频第27:52 是怎么做到直接隔空换行的,然后注意为什么是post.title; 不是posts.title
import axios from 'axios';
import useWebSocket, {ReadyState} from 'react-use-websocket';

import {AuthContext} from '../context/authContext';

function Todo({todo, index, completeTodo, undoTodo, removeTodo}) {
    const {currentUser, logout} = useContext(AuthContext);

    return (
        <div
            className="todo"
            style={{
            textDecoration: todo.isCompleted
                ? "line-through"
                : ""
        }}>
            {todo.text}
            <div>
                {todo.isCompleted
                    ? (
                        <button onClick={() => undoTodo(index, todo.id)}>Undo</button>
                    )
                    : (
                        <button onClick={() => completeTodo(index, todo.id)}>Complete</button>
                    )}
                {todo.creatorId == currentUser.id
                    ? (
                        <button onClick={() => removeTodo(index, todo.id)}>x</button>
                    )
                    : ""
}
            </div>
        </div>
    );
}

function TodoForm({addTodo}) {
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
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Press enter to add a new task"/>
        </form>
    );
}

const Home = () => {
    const {currentUser, logout} = useContext(AuthContext);
    const {sendMessage, lastJsonMessage, readyState} = useWebSocket(`ws://localhost:8800/api/message/${currentUser.id}`);

    const [todos, setTodos] = React.useState([]);
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        const fetchData = async() => {
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
        const msg = {...lastJsonMessage};
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
            const res = await axios.post(`/api/todo/`, {name: text});
            const newTodos = [
                ...todos,
                res.data
            ];
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const completeTodo = async(index, id) => {
        try {
            const res = await axios.put(`/api/todo/${id}`, {isCompleted: true});
            const newTodos = [...todos];
            newTodos[index] = res.data;
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const undoTodo = async(index, id) => {
        try {
            const res = await axios.put(`/api/todo/${id}`, {isCompleted: false});
            const newTodos = [...todos];
            newTodos[index] = res.data;
            setTodos(newTodos);
        } catch (err) {
            console.log(err);
        }
    };

    const removeTodo = async(index, id) => {
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
            <div className="title">
                My Todos!
            </div>
            <div className="todo-list">
                {todos.map((todo, index) => (<Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    undoTodo={undoTodo}
                    removeTodo={removeTodo}/>))}
                <TodoForm addTodo={addTodo}/>
            </div>
            <div className="connection">
                Connecting status to server: {connectionStatus}.
            </div>
            <div className="buttons"></div>
        </div>
    );
}

export default Home