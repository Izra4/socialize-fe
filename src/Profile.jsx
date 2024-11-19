import { useState, useEffect } from "react";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import vec from "./assets/vec-prof.png";
import pict from "./assets/background.png";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api/api";
import Cookies from "js-cookie";

export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt-token")}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.obj.name,
            email: data.obj.email,
            photo: data.obj.photo.Valid ? data.obj.photo.String : null,
          });
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    Cookies.remove("jwt-token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen font-montserrat">
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <div className="w-full mt-20 pl-10 pt-10 ml-64">
          <img src={vec} alt="vector" className="absolute bottom-0 right-0" />

          <div className="w-full h-[550px] relative">
            <div className="bg-gray-100 w-2/3 h-3/4 rounded-xl pl-3 pt-3">
              <p className="font-semibold text-3xl">Settings</p>
              <div className="w-full h-3/4 mt-2 flex flex-row">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <div className="w-44 h-44 p-[2px] rounded-full bg-gradient-to-b from-primary_blue to-secondary_blue">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={userData.photo || pict}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <button className="bg-primary_blue text-white py-2 px-6 rounded-3xl font-semibold mt-4 text-sm z-10">
                    Edit picture
                  </button>
                </div>

                {/* Name and Email */}
                <div className="flex flex-col ml-7 mt-3 relative">
                  <div className="flex flex-col max-w-sm h-fit p-4">
                    <p className="text-primary_blue font-semibold">Name</p>
                    <p>{userData.name}</p>
                    <p className="text-primary_blue font-semibold mt-3">
                      Email
                    </p>
                    <p>{userData.email}</p>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                  <div className="self-end text-white font-semibold text-sm mt-3 space-x-2">
                    <button className="bg-primary_blue py-2 px-4 rounded-3xl">
                      Edit Password
                    </button>
                    <button
                      className="bg-primary_blue py-2 px-4 rounded-3xl"
                      onClick={() => navigate("/profile/update")}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-3xl font-semibold absolute bottom-0 right-0 mr-28 mb-4"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
