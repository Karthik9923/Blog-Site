import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user's name

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/posts');
                console.log(response.data); // Log the response to check the post structure
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchLoggedInUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token); // Decode the JWT to get user info
                setLoggedInUser(decoded.name); // Assuming the token contains the user's name
            }
        };

        fetchPosts();
        fetchLoggedInUser();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Display logged-in user's name */}
            {loggedInUser && (
                <Box mb={4}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Welcome, {loggedInUser}!
                    </Typography>
                </Box>
            )}

            <Typography variant="h4" align="center" gutterBottom>
                Latest Blog Posts
            </Typography>

            <Grid container spacing={4}>
                {posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={post.image || 'https://via.placeholder.com/400x200.png?text=Blog'}
                                alt={post.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {post.content.substring(0, 100)}...
                                </Typography>

                                {/* Check if post.author exists and display the name */}
                                {post.author ? (
                                    <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
                                        By {post.author.name} on {new Date(post.timestamp).toLocaleDateString()}
                                    </Typography>
                                ) : (
                                    <Typography variant="caption" color="textSecondary" display="block">
                                        Author info not available
                                    </Typography>
                                )}

                                <Button
                                    component={Link}
                                    to={`/post/${post._id}`}
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
