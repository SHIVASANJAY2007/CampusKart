const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId; // From auth middleware

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = new Post({
      content: content.trim(),
      author: userId,
      authorName: user.username,
      likes: [],
      comments: []
    });

    await post.save();
    await post.populate('author', 'username');

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post._id,
        content: post.content,
        user: { name: post.authorName },
        time: formatTime(post.createdAt),
        likes: post.likes.length,
        comments: post.comments.length
      }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Newest first
      .populate('author', 'username')
      .populate('likes', 'username')
      .populate('comments.user', 'username');

    const formattedPosts = posts.map(post => ({
      id: post._id,
      content: post.content,
      user: { name: post.authorName },
      time: formatTime(post.createdAt),
      likes: post.likes.length,
      comments: post.comments.length,
      isLiked: post.likes.some(like => like._id.toString() === req.userId)
    }));

    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Like/Unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex(
      like => like.toString() === userId
    );

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      likes: post.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    post.comments.push({
      user: userId,
      userName: user.username,
      content: content.trim()
    });

    await post.save();

    res.json({
      message: 'Comment added successfully',
      comments: post.comments.length
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to format time
function formatTime(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return postDate.toLocaleDateString();
  }
}


