import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import Core from '../components/core';

const API_URL = 'http://localhost:5000/api/posts';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view posts');
        return;
      }

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to connect to server');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to post');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: postContent })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Post created successfully!');
        setPostContent('');
        // Refresh posts
        await fetchPosts();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to like posts');
        return;
      }

      const response = await fetch(`${API_URL}/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Refresh posts to get updated like count
        await fetchPosts();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Render the Core animation component */}
        <Core />
        
        {/* The rest of the Community component code */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#2B303B] tracking-wide leading-tight mb-4">
            Campus Community Board
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Connect with your peers. Post requests, share tips, and build a stronger community.
          </p>
        </div>
        
        {/* Post Creation Section */}
        <form onSubmit={handlePostSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 text-[#2B303B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF] transition-all duration-300"
            rows="4"
            placeholder="What's on your mind? Post a request or a message here..."
            disabled={loading}
          ></textarea>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
          {success && (
            <div className="mt-2 text-green-500 text-sm">{success}</div>
          )}
          
          <div className="flex justify-end mt-4">
            <button 
              type="submit"
              disabled={loading || !postContent.trim()}
              className="bg-[#007BFF] text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-[#0056b3] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post to Community'}
            </button>
          </div>
        </form>

        {/* Community Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet. Be the first to post!</p>
            </div>
          ) : (
            posts.map(post => (
              <Post 
                key={post.id} 
                {...post} 
                onLike={() => handleLike(post.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}