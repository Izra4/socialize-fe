import { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from './assets/bg-reg.png';
import vec1 from './assets/vector-login.png';
export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="w-screen h-screen relative overflow-hidden font-montserrat flex flex-row">
                <div className="bg-amber-500 h-screen w-4/5 flex items-center justify-center relative">
                    <img src={bg} alt="background" className="object-contain z-0" />
                    <div className="absolute w-full h-full bg-black opacity-75 z-0"></div>
                    <Link to="/" className="absolute text-8xl font-bold bg-gradient-to-r from-primary_blue to-secondary_blue bg-clip-text text-transparent">
                        Socialize
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-center w-2/5 bg-white relative">
                    <img src={vec1} alt="vector" className="absolute bottom-0 right-0 z-0" />

                    <div className="bg-blue-500 px-8 rounded-lg shadow-lg w-4/6 max-w-md text-white mt-12 z-10">
                        <h1 className="text-3xl font-bold mb-2 mt-4">Welcome Back!</h1>
                        <div className="w-full h-0.5 bg-gray-200 mb-6"></div>

                        <form className="flex flex-col space-y-4">
                            <div>
                                <p>Email</p>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="p-3 rounded-xl bg-white text-black focus:outline-none w-full"
                                />
                            </div>
                            <div>
                                <p>Password</p>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="p-3 rounded-xl bg-white text-black focus:outline-none w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-3 text-black focus:outline-none"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-white w-1/2 text-primary_blue p-3 rounded-xl font-semibold hover:bg-opacity-90 mt-5 mb-4"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Register Link Outside of the Blue Div */}
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Don&#39;t have an account?</p>
                        <Link to="/register" className="text-primary_blue underline">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
