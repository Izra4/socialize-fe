import { useState, useEffect } from "react";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import vec from "./assets/vec-prof.png";
import { API_BASE_URL } from "./api/api";
import Cookies from "js-cookie";

export const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt-token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.obj.name,
            email: data.obj.email,
          });
          setNewName(data.obj.name);
          setNewEmail(data.obj.email);
        } else {
          setError("Failed to fetch user data");
        }
      } catch {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-data`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.obj.name,
          email: data.obj.email,
        });
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update user data.");
      }
    } catch {
      setError("An error occurred while updating the user data.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col min-h-screen font-montserrat">
        <Header />
        <div className="flex flex-row">
          <Navbar />
          <div className="w-full mt-20 pl-10 pt-10 ml-64">
            <img src={vec} alt="vector" className="absolute bottom-0 right-0" />
            <div className="w-full h-[550px] relative">
              <div className="w-2/3 h-3/4 bg-gray-100 rounded-xl p-8">
                <p className="font-semibold text-3xl mb-6">Settings</p>

                {/* Name and Email Fields */}
                <div className="space-y-6">
                  <div>
                    <label
                      className="text-primary_blue font-semibold block mb-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                      placeholder="Enter your name"
                      value={newName} // Bind to newName state
                      onChange={(e) => setNewName(e.target.value)} // Handle changes
                    />
                  </div>

                  <div>
                    <label
                      className="text-primary_blue font-semibold block mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                      placeholder="Enter your email"
                      value={newEmail} // Bind to newEmail state
                      onChange={(e) => setNewEmail(e.target.value)} // Handle changes
                    />
                  </div>
                  <div>
                    <label
                      className="text-primary_blue font-semibold block mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                      placeholder="Enter your password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} // Handle changes
                    />
                  </div>
                </div>

                {/* Buttons */}
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                <div className="flex space-x-4 mt-6">
                  <button
                    className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold"
                    onClick={() => setNewName(userData.name)} // Reset name to original value
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary_blue text-white py-2 px-6 rounded-lg font-semibold"
                    onClick={handleUpdate} // Trigger update
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
