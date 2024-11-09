import { AiFillHome } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="fixed w-64 h-screen bg-gray-100 px-4 py-28 border-r border-gray-300 flex flex-col space-y-4">
            <Link to="/dashboard">
                <div className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    location.pathname === "/dashboard" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}>
                    <AiFillHome className="text-blue-500" size={24} />
                    <span className="text-blue-500 font-semibold">Home</span>
                </div>
            </Link>

            <div className={'flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer' +
                `${
                location.pathname === "/my-post" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}>
                <FaFileAlt className="text-blue-500" size={24} />
                <span className="text-blue-500 font-semibold">My post</span>
            </div>
        </div>
    );
};

export default Navbar;
