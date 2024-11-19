import { useState, useEffect } from "react";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import Post from "./component/post.jsx";
import {API_BASE_URL} from "./api/api.jsx";
import Cookies from "js-cookie";

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/post`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt-token")}`,
          }
        }); // Ganti dengan URL API Anda
        const data = await response.json();
        if (data.status === 200) {
          setPosts(data.obj); // Ambil array `obj` dari API response
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchPosts();
  }, []);

  return (
      <>
        <div className="w-full flex flex-col min-h-screen font-montserrat">
          <Header />
          <div className="flex flex-row">
            <Navbar />
            <div className="w-full mt-20 pl-10 pt-10 ml-64">
              {loading ? (
                  <p>Loading posts...</p>
              ) : (
                  posts.map((post) => (
                      <Post
                          key={post.id}
                          profile={post.user_photo}
                          username={post.user_name}
                          time={new Date(post.created_at).toLocaleString()} // Format waktu
                          text={post.content}
                          image={post.image}
                          likes={post.up_vote}
                          comments={0} // Tidak ada data comments di API, set ke 0 atau sesuai kebutuhan
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
