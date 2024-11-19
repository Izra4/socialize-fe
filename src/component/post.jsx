import PropTypes from "prop-types";
import { useState } from "react";

const Post = ({
                  username,
                  time,
                  text,
                  profile,
                  likes: initialLikes,
                  comments,
                  image,
              }) => {
    // State untuk jumlah likes
    const [likes, setLikes] = useState(initialLikes);

    // Fungsi untuk mengurangi likes ketika downvote di klik
    const handleDownvote = () => {
        setLikes((prevLikes) => Math.max(0, prevLikes - 1)); // Tidak boleh kurang dari 0
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

            <p className="text-gray-800 mb-4">{text}</p>

            {image && (
                <div className="w-full h-60 bg-gray-300 overflow-hidden rounded-lg">
                    <img src={image} alt="Post" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex justify-between mt-4 text-gray-600">
                <div className="flex items-center space-x-4">
                    {/* Tombol Like */}
                    <span className="cursor-pointer flex items-center space-x-1">
            <span>👍</span>
            <span>{likes}</span>
          </span>
                    {/* Tombol Downvote */}
                    <span
                        className="cursor-pointer flex items-center space-x-1"
                        onClick={handleDownvote}
                    >
            <span>👎</span>
          </span>
                    {/* Jumlah Comments */}
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
    username: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    image: PropTypes.string,
};

export default Post;
