import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
