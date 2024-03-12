import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



//怎么做到一下子都改成功的，userState 很重要
const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        nickname: "",
        email: "",
        password: "",
    })
    const [err, setError] = useState(null);

    const navigate = useNavigate()   //import { useNavigate } from 'react-router-dom'; 这个和视频里的不一样

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {     //async
        e.preventDefault()
        try {
            await axios.post("/api/auth/register", inputs)
            navigate("/login");

        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
    }

    console.log(inputs)

    return (
        <div className='auth'>
            <h1 className='title'>Register</h1>
            <form>
                <input required type="text" placeholder='username' name='username' onChange={handleChange} />
                <input required type="text" placeholder='nickname' name='nickname' onChange={handleChange} />
                <input required type="email" placeholder='email' name='email' onChange={handleChange} />
                <input required type="password" placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p className='error'>{err}</p>}
                <span>Do you have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register