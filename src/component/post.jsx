import PropTypes from "prop-types";
import { useState } from "react";
import DOMPurify from "dompurify";
import { API_BASE_URL } from "../api/api.jsx";
import Cookies from "js-cookie";

const Post = ({
  id,
  username,
  time,
  title,
  text,
  profile,
  likes: initialLikes,
  comments,
  image,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleUpvote = async () => {
    if (hasLiked) {
      alert("You have already liked this post.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/post/${id}/up-vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
      });

      if (response.ok) {
        setLikes((prevLikes) => prevLikes + 1);
        setHasLiked(true);
      } else {
        console.error("Failed to upvote the post");
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = () => {
    setLikes((prevLikes) => Math.max(0, prevLikes - 1));
  };

  return (
    <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-md mb-6 p-4 flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-bold text-blue-700">{username}</h3>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      <p
        className="text-gray-800 mb-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
      ></p>

      {image && (
        <div className="w-full h-60 bg-gray-300 overflow-hidden rounded-lg">
          <img src={image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex justify-between mt-4 text-gray-600">
        <div className="flex items-center space-x-4">
          <span
            className="cursor-pointer flex items-center space-x-1"
            onClick={handleUpvote}
          >
            <span>👍</span>
            <span>{likes}</span>
          </span>
          <span
            className="cursor-pointer flex items-center space-x-1"
            onClick={handleDownvote}
          >
            <span>👎</span>
          </span>
          <span className="cursor-pointer flex items-center space-x-1">
            <span>💬</span>
            <span>{comments}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  image: PropTypes.string,
};

export default Post;
