import logo from '../assets/logo.png';
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
    return (
        <div className="absolute z-10 bg-white w-full flex flex-col items-center">
            <div className="flex items-center justify-center py-4 px-4 w-full h-20">
                <div className="flex items-center space-x-3 mr-4">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary_blue to-secondary_blue bg-clip-text text-transparent">Socialize</span>
                </div>

                <div className="flex-grow flex justify-center">
                    <form className="w-full max-w-lg relative">
                        <input
                            type="search"
                            placeholder="Search something"
                            className="w-full p-2 pl-10 rounded-full bg-gray-200 text-gray-700 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <AiOutlineSearch size={18} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center space-x-4 ml-4">
                    <button className="px-8 py-2 rounded-full text-white font-semibold" style={{ backgroundColor: "#498AFF" }}>
                        Post
                    </button>

                    <div
                        className="w-12 h-12 p-[2px] rounded-full bg-gradient-to-b from-primary_blue to-secondary_blue overflow-hidden">
                        <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                            <img
                                src={logo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full h-1 bg-blue-400"></div>
        </div>
    );
};

export default Header;
