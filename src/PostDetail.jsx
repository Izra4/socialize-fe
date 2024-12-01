import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./api/api.jsx";
import Cookies from "js-cookie";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import Post from "./component/post.jsx";
import Comment from "./component/comment.jsx";
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
            // Ensure post.comment is always an array
            setPost({
              ...data.obj,
              comment: data.obj.comment || [],
            });
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

  const handleCancel = () => {
    setComment(""); // Clear the comment input
  };

  const handlePostComment = async () => {
    if (!comment.trim()) return; // Don't post empty comments

    try {
      const response = await fetch(`${API_BASE_URL}/post/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("jwt-token")}`,
        },
        body: JSON.stringify({ comment }), 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 201) {
          window.location.reload(); // Reload page on successful comment post
          setComment(""); // Clear the comment input
        } else {
          setError("Failed to post comment");
        }
      } else {
        setError("Failed to post comment");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full flex flex-col min-h-screen font-montserrat">
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <div className="w-full mt-20 pl-10 pt-10 ml-64">
          <Post
            profile={post.user_photo}
            username={post.user_name}
            title={post.title}
            text={post.content}
            time={post.created_at}
            image={post.image}
            likes={post.up_vote}
            comments={post.comment.length}
          />
          <div className="w-full max-w-3xl mt-8">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 h-auto resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              placeholder="Write a comment..."
              value={comment}
            />
            <div className="flex justify-end my-2 flex-row space-x-2">
              <button onClick={handleCancel} className="bg-red-500 text-white py-1 px-3 rounded-full">
                Cancel
              </button>
              <button onClick={handlePostComment} className="bg-blue-500 text-white py-1 px-3 rounded-full">
                Comment
              </button>
            </div>

            <div>
              {post.comment.length > 0 ? (
                post.comment.map((commentData) => (
                  <div key={commentData.id}>
                    <Comment
                      pict={commentData.user_photo || pict}
                      name={commentData.user_name}
                      commentText={commentData.comment}
                    />
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
