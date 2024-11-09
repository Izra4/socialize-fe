const Post = ({
                  // eslint-disable-next-line react/prop-types
                  username, time, text, profile, likes, comments, image
}) => {
    return (
        <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-md mb-6 p-4 flex flex-col">
            <div className="flex items-center mb-4">
                <img src={profile} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h3 className="font-bold text-blue-700">{username}</h3>
                    <p className="text-sm text-gray-500">{time}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4">
                {text}
            </p>

            <div className="w-full h-60 bg-gray-300 overflow-hidden rounded-lg">
                <img src={image} alt="Post" className="w-full h-full object-cover" />
            </div>

            <div className="flex justify-between mt-4 text-gray-600">
                <div className="flex items-center space-x-2">
                    <span className="cursor-pointer">{likes} 👍</span>
                    <span className="cursor-pointer">{comments} 💬</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
