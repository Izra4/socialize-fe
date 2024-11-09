import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import vec from "./assets/vec-prof.png";
import pict from "./assets/background.png";

export const Profile = () => {
    return (
        <>
            <div className="w-full flex flex-col min-h-screen font-montserrat">
                <Header />
                <div className="flex flex-row">
                    <Navbar />
                    <div className="w-full mt-20 ml-64 h-[680px]">
                        <img src={vec} alt="vector" className="absolute bottom-0 right-0" />

                        <div className="w-[1200px] h-5/6 ml-8 mt-8 relative">
                            <div className="bg-gray-100 w-2/3 h-3/4 rounded-xl pl-3 pt-3">
                                <p className="font-semibold text-3xl">Settings</p>
                                <div className="w-full h-3/4 mt-2 flex flex-row">

                                    {/*INI BUAT GAMBAR PROFIL*/}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-44 h-44 p-[2px] rounded-full bg-gradient-to-b from-primary_blue to-secondary_blue">
                                            <div className="w-full h-full rounded-full overflow-hidden">
                                                <img
                                                    src={pict}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="bg-primary_blue text-white py-2 px-6 rounded-3xl font-semibold mt-4 text-sm z-10"
                                        >
                                            Edit picture
                                        </button>
                                    </div>

                                    {/*INI BUAT NAMA DAN EMAIL*/}
                                    <div className="flex flex-col ml-7 mt-3 relative">
                                        <div className="flex flex-col max-w-sm h-fit p-4">
                                            <p className="text-primary_blue font-semibold">Name</p>
                                            <p>Indra Adizra Fedebintang Maula</p>
                                            <p className="text-primary_blue font-semibold mt-3">Email</p>
                                            <p>anjay@gmail.com</p>
                                        </div>
                                        <div
                                            className="self-end text-white font-semibold text-sm mt-3 space-x-2">
                                            <button className="bg-primary_blue py-2 px-4 rounded-3xl">
                                                Edit Password
                                            </button>
                                            <button className="bg-primary_blue py-2 px-4 rounded-3xl">
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-3xl font-semibold absolute bottom-0 right-0 mr-28 mb-4"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
