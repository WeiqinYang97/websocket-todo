import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { AuthContext } from '../context/authContext';


const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(inputs)
            await login(inputs)
            navigate("/");
        } catch (err) {
            console.log(inputs)
            console.log({ err })
            setError(err.response.data);
        }
    };
    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder='username' name="username" onChange={handleChange} />
                <input required type="text" placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}

                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login