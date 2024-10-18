import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';
import { jwtDecode } from 'jwt-decode';  // Use named import

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        // Fetch post data
        const fetchPost = async () => {
            const response = await axios.get(`http://localhost:8001/api/posts/${id}`);
            setPost(response.data);
        };
        fetchPost();

        // Decode JWT to get the logged-in user's ID
        const token = localStorage.getItem('token');  // Assume JWT is stored in localStorage
        if (token) {
            const decoded = jwtDecode(token);  // Use jwtDecode
            setLoggedInUserId(decoded.id);  // Extract user ID from the token
        }
    }, [id]);

    if (!post) return <Typography variant="h6" align="center">Loading...</Typography>;

    const isAuthor = post.author._id === loggedInUserId;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {post.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        By {post.author.name} on {new Date(post.timestamp).toLocaleDateString()}
                    </Typography>

                    {/* Conditionally render Edit/Delete buttons if the logged-in user is the author */}
                    {isAuthor && (
                        <Box sx={{ mt: 3 }}>
                            <Button 
                                variant="contained" 
                                color="warning" 
                                component={Link} 
                                to={`/update/${post._id}`} 
                                sx={{ mr: 2 }}
                            >
                                Edit Post
                            </Button>
                            <Button 
                                variant="contained" 
                                color="error" 
                                component={Link} 
                                to={`/delete/${post._id}`}
                            >
                                Delete Post
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default PostDetailPage;
