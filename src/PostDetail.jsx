import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./api/api.jsx";
import Cookies from "js-cookie";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import Post from "./component/post.jsx";
import pict from "./assets/background.png";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt-token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 200) {
            setPost(data.obj);
          } else {
            setError("Post not found");
          }
        } else {
          throw new Error("Failed to fetch post details");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full flex flex-col min-h-screen font-montserrat">
        <Header />
        <div className="flex flex-row">
          <Navbar />
          <div className="w-full mt-20 pl-10 pt-10 ml-64">
            {loading ? <p>Loading post...</p> : 
            <Post 
                profile={post.user_photo}
                username={post.user_name}
                title={post.title}
                text={post.content}
                time={post.created_at}
                image={post.image}
                likes={post.up_vote}
                comments={post.comments}
             />}
            <div className="w-full max-w-3xl">
                <textarea 
                    onChange={(c) => setComment(c.target.value)}
                    className="
                        w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 h-auto resize-none
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                    "
                    placeholder="Write a comment..."
                    value={comment}
                />
                <div className="flex justify-end my-2 flex-row space-x-2">
                    <button className="bg-red-500 text-white py-1 px-3 rounded-full">
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded-full">
                        Comment
                    </button>
                </div>
            </div>

            <div className="w-full max-w-3xl rounded-lg bg-gray-100 mb-4">
                <div className="p-4 flex flex-row space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-b from-primary_blue to-secondary_blue border-2 border-transparent hover:border-blue-500 flex-shrink-0">
                        <img src={pict} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col w-full max-w-full overflow-hidden">
                        <p className="text-blue-500 font-semibold">Name</p>
                        <p className="break-words overflow-auto">qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop</p> {/* Kelas break-words + overflow-auto */}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl rounded-lg bg-gray-100 mb-4">
                <div className="p-4 flex flex-row space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-b from-primary_blue to-secondary_blue border-2 border-transparent hover:border-blue-500 flex-shrink-0">
                        <img src={pict} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col w-full max-w-full overflow-hidden">
                        <p className="text-blue-500 font-semibold">Name</p>
                        <p className="break-words overflow-auto">qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop</p> {/* Kelas break-words + overflow-auto */}
                    </div>
                </div>
            </div>
            
          </div>
        </div>
    </div>
  );
};

export default PostDetail;
