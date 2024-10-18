import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import {jwtDecode} from 'jwt-decode'; // Fix: Correct way to import jwtDecode

const DeletePostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/posts/${id}`);
                setPost(response.data);

                // Decode JWT to get the logged-in user's ID
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    setLoggedInUserId(decoded.id);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                alert('Could not fetch post details.');
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete a post.');
            return;
        }
        
        try {
            // Log token and id to ensure they are correct
            console.log('Deleting post with ID:', id, 'Token:', token);

            const response = await axios.delete(`http://localhost:8001/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` } // Ensure token is being passed properly
            });

            // Log success response for further debugging
            console.log('Post deleted successfully:', response.data);
            alert('Post deleted successfully');
            navigate('/');
        } catch (error) {
            // Log error details
            console.error('Error deleting post:', error.response ? error.response.data : error.message);
            alert('Failed to delete the post. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(`/post/${id}`);
    };

    if (!post) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    // Only allow post deletion if the logged-in user is the author
    const isAuthor = post.author._id === loggedInUserId;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Delete Post
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the post titled "<strong>{post.title}</strong>"?
            </Typography>

            {isAuthor ? (
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={{ mr: 2 }}
                    >
                        Yes, Delete
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Typography variant="body2" color="error">
                    You are not authorized to delete this post.
                </Typography>
            )}
        </Container>
    );
};

export default DeletePostPage;
