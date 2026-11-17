const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Create a new post
router.post('/', postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Like/Unlike a post
router.post('/:postId/like', postController.toggleLike);

// Add a comment to a post
router.post('/:postId/comment', postController.addComment);

// Delete a post
router.delete('/:postId', postController.deletePost);

module.exports = router;


