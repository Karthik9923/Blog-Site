import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8001/api/posts', { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            navigate('/'); 
        } catch (error) {
            console.error('Post creation failed', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePostPage;
