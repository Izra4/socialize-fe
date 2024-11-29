import { useState, useEffect } from "react";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import Post from "./component/post.jsx";
import { API_BASE_URL } from "./api/api.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noPostsFound, setNoPostsFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt-token")}`,
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          setPosts(data.obj);
        } else if (data.status === 401) {
          Cookies.remove("jwt-token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleSearchResults = (results) => {
    if (results === null || (Array.isArray(results) && results.length === 0)) {
      setSearchResults([]); 
      setNoPostsFound(true); 
    } else {
      setSearchResults(results); 
      setNoPostsFound(false); 
    }
  };

  const renderPosts = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : posts;

  return (
    <>
      <div className="w-full flex flex-col min-h-screen font-montserrat">
        <Header setSearchResults={handleSearchResults} />
        <div className="flex flex-row">
          <Navbar />
          <div className="w-full mt-20 pl-10 pt-10 ml-64">
            {loading ? (
              <p>Loading posts...</p>
            ) : noPostsFound ? (
              <p>Post not found</p>
            ) : renderPosts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              renderPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  profile={post.user_photo}
                  username={post.user_name}
                  time={new Date(post.created_at).toLocaleString()}
                  title={post.title}
                  text={post.content}
                  image={post.image}
                  likes={post.up_vote}
                  comments={0}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
