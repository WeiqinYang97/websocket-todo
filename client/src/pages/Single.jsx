import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment/moment';
import { AuthContext } from '../context/authContext';



const Single = () => {
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2]

    const { currentUser } = useContext(AuthContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "/api/posts/" + postId;
                console.log(123);
                const res = await axios.get(url); //调用后端接口API，拉取当前的文章
                setPost(res.data); //将拉取到的文章用post 保存
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    console.log(Edit);
    console.log(currentUser.username);
    console.log(post.username);

    return (
        <div className='single'>
            <div className="content">
                <img
                    src={post?.img}
                    alt="" />
                <div className="user">
                    {post.userImg && <img
                        src={post.userImg}
                        alt=""
                    />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.data).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                {post.desc}
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single