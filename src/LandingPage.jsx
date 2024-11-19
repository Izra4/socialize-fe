import top from "./assets/top_header.png";
import bg from "./assets/background.png";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-screen h-screen bg-white relative overflow-hidden font-montserrat">
        <img src={bg} alt="" className="absolute object-cover z-0" />
        <div className="absolute w-full h-full bg-black opacity-75 z-0"></div>
        <div className={"relative w-full h-[300px]"}>
          <img src={top} alt="header" className="absolute -top-4 -left-6" />
          <div className="h-[100px] w-[250px] absolute top-0 right-0 flex items-center justify-center space-x-4 mr-6">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-3xl z-20"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-8 rounded-3xl z-20"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[300px] flex items-center justify-center space-x-8">
            <img src={logo} alt="logo" className="w-64 h-64" />
            <div className="flex flex-col">
              <div className="font-bold text-6xl">
                <p className="text-primary_blue">Welcome to</p>
                <p className="bg-gradient-to-r from-primary_blue to-secondary_blue bg-clip-text text-transparent">
                  Socialize
                </p>
              </div>
              <p className="font-medium text-white">
                A place to post your story, socializing with your
              </p>
              <p className="font-medium text-white">
                friends, and express your emotion freely!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
