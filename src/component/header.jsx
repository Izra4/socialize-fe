import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import {
  AiOutlineSearch,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import pict from "../assets/background.png";
import { API_BASE_URL } from "../api/api.jsx";

const Header = ({ setSearchResults }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    photo: "",
  });

  const fetchUserData = useCallback(async () => {
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
          photo: data.obj.photo,
        });
      } else if (response.status === 401) {
        Cookies.remove("jwt-token");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    Cookies.remove("jwt-token");
    navigate("/login");
  };

  const handleSearch = async () => {
    setKeyword("");
    try {
      const response = await fetch(`${API_BASE_URL}/post?keyword=${keyword}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setSearchResults(data.obj); // Update search results in parent component
      } else if (data.status === 401) {
        Cookies.remove("jwt-token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="fixed z-10 bg-white w-full flex flex-col items-center">
      <div className="flex items-center justify-center py-4 px-4 w-full h-20">
        <div className="flex items-center space-x-3 mr-4">
          <Link to="/dashboard">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <Link
            to="/dashboard"
            className="text-3xl font-bold bg-gradient-to-r from-primary_blue to-secondary_blue bg-clip-text text-transparent"
          >
            Socialize
          </Link>
        </div>

        <div className="flex-grow flex justify-center">
          <form className="w-full max-w-lg relative">
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search something"
              className="w-full p-2 pl-10 rounded-full bg-gray-200 text-gray-700 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={handleSearchClick}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <AiOutlineSearch size={18} />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          <button
            onClick={() => {
              navigate("/post");
            }}
            className="px-8 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#498AFF" }}
          >
            Post
          </button>

          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-12 h-12 p-[2px] rounded-full bg-gradient-to-b from-primary_blue to-secondary_blue overflow-hidden cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={
                    userData.photo && userData.photo !== ""
                      ? userData.photo
                      : pict
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-primary_blue font-semibold text-white rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-blue-400 rounded-t-lg"
                >
                  <AiFillSetting className="mr-2" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-blue-400 rounded-b-lg"
                >
                  <AiOutlineLogout className="mr-2" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-blue-400"></div>
    </div>
  );
};

Header.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Header;
