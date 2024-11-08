import { AiFillHome } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="w-64 h-screen bg-gray-100 px-4 py-28 border-r border-gray-300 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                <AiFillHome className="text-blue-500" size={24} />
                <span className="text-blue-500 font-semibold">Home</span>
            </div>

            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                <FaFileAlt className="text-blue-500" size={24} />
                <span className="text-blue-500 font-semibold">My post</span>
            </div>
        </div>
    );
};

export default Navbar;