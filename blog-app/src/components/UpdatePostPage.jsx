import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`http://localhost:8001/api/posts/${id}`); 
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8001/api/posts/${id}`, post, {
                headers: { Authorization: `Bearer ${token}` }           
            });
            navigate('/');
        } catch (error) {
            console.error('Post update failed', error);
            alert("you cannot update this post!")
        }
    };

    return (
        <div className="container mt-4">
            <h1>Update Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" rows="5" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Post</button>
            </form>
        </div>
    );
}

export default UpdatePostPage;
