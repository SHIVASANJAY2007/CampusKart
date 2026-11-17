import React, { useState } from 'react';
import { UserCircle2, MessageSquare, Heart } from 'lucide-react';

export default function Post({ id, user, content, time, likes, comments, isLiked, onLike }) {
  const [liked, setLiked] = useState(isLiked || false);
  const [likeCount, setLikeCount] = useState(likes || 0);

  const handleLikeClick = () => {
    if (onLike) {
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
      onLike();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6 transform hover:scale-[1.01] hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <UserCircle2 size={48} className="text-[#007BFF] mr-4" />
        <div>
          <h4 className="text-[#2B303B] font-semibold text-lg">{user?.name || 'Anonymous'}</h4>
          <span className="text-gray-500 text-sm">{time || 'Just now'}</span>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="text-gray-700 text-base leading-relaxed mb-4">
        <p>{content}</p>
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center text-gray-500">
        <div 
          onClick={handleLikeClick}
          className={`flex items-center mr-6 transition-colors cursor-pointer ${liked ? 'text-[#007BFF]' : 'hover:text-[#007BFF]'}`}
        >
          <Heart size={20} className={`mr-2 ${liked ? 'fill-current' : ''}`} />
          <span className="font-medium">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
        </div>
        <div className="flex items-center hover:text-[#007BFF] transition-colors cursor-pointer">
          <MessageSquare size={20} className="mr-2" />
          <span className="font-medium">{comments || 0} {comments === 1 ? 'Comment' : 'Comments'}</span>
        </div>
      </div>
    </div>
  );
}