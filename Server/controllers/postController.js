import Post from '../models/postModel.js';
import mongoose from 'mongoose';

export const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({
            title,
            content,
            author: req.user.id, // Ensure the user is authenticated and their ID is set
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(400).json({ message: 'Error creating post' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.json(posts);
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        const post = await Post.findById(id).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error("Error retrieving post:", error);
        res.status(500).json({ message: 'Error retrieving post' });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        post.title = title;
        post.content = content;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: 'Error updating post' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        // Find the post by ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        // Delete the post
        await post.deleteOne();  // Use deleteOne instead of remove
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};

