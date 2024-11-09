import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import vec from "./assets/vec-prof.png";

export const ProfileUpdate = () => {
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
                                        <label className="text-primary_blue font-semibold block mb-1" htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-primary_blue font-semibold block mb-1" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-4 mt-6">
                                    <button className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold">
                                        Cancel
                                    </button>
                                    <button className="bg-primary_blue text-white py-2 px-6 rounded-lg font-semibold">
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
