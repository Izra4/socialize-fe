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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
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
          photo: data.obj.photo,
        });
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("Network error. Please try again later. error: ",err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleEditPictureClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch(`${API_BASE_URL}/file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        setError("File upload failed.");
        return;
      }

      const uploadData = await uploadResponse.json();
      const uploadedPhotoUrl = uploadData.obj;

      const updateResponse = await fetch(`${API_BASE_URL}/auth/update-photo`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
        body: JSON.stringify({ photo_url: uploadedPhotoUrl }),
      });

      if (updateResponse.ok) {
        setError("");
        setFile(null);
        setFileName("");
        await fetchUserData();
      } else {
        setError("Failed to update profile photo.");
      }
    } catch (err) {
      setError("An error occurred while uploading the file. err: ",err);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setFileName("");
  };

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
                            src={userData.photo && userData.photo !== "" ? userData.photo : pict}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Display selected file name */}
                    {fileName && (
                        <p className="mt-2 text-sm font-semibold text-gray-600">{fileName}</p>
                    )}
                    {/* Hidden file input */}
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {/* Edit picture button */}
                    <button
                        className="bg-primary_blue text-white py-2 px-6 rounded-3xl font-semibold mt-2 text-sm z-10"
                        onClick={handleEditPictureClick}
                    >
                      Edit Picture
                    </button>
                    {/* Save and Cancel buttons */}
                    {file && (
                        <div className="flex mt-2 space-x-2">
                          <button
                              className="bg-green-500 text-white py-2 px-6 rounded-3xl font-semibold text-sm"
                              onClick={handleUpload}
                          >
                            Save
                          </button>
                          <button
                              className="bg-red-500 text-white py-2 px-6 rounded-3xl font-semibold text-sm"
                              onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                    )}
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
