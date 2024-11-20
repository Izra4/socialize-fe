import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "./assets/bg-reg.png";
import vec1 from "./assets/vector-login.png";
import { API_BASE_URL } from "./api/api.jsx";
import Cookies from "js-cookie";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt-token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt-token", data.obj, {
          expires: 7,
          secure: false,
          path: "/",
        });
        console.log(Cookies.get("jwt-token"));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden font-montserrat flex flex-row">
        <div className="bg-amber-500 h-screen w-4/5 flex items-center justify-center relative">
          <img src={bg} alt="background" className="object-contain z-0" />
          <div className="absolute w-full h-full bg-black opacity-75 z-0"></div>
          <Link
            to="/"
            className="absolute text-8xl font-bold bg-gradient-to-r from-primary_blue to-secondary_blue bg-clip-text text-transparent"
          >
            Socialize
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center w-2/5 bg-white relative">
          <img
            src={vec1}
            alt="vector"
            className="absolute bottom-0 right-0 z-0"
          />

          <div className="bg-blue-500 px-8 rounded-lg shadow-lg w-4/6 max-w-md text-white mt-12 z-10">
            <h1 className="text-3xl font-bold mb-2 mt-4">Welcome Back!</h1>
            <div className="w-full h-0.5 bg-gray-200 mb-6"></div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-xl bg-white text-black focus:outline-none w-full"
                  required
                />
              </div>
              <div>
                <p>Password</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-xl bg-white text-black focus:outline-none w-full"
                    required
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
                  disabled={loading}
                  className={`bg-white w-1/2 text-primary_blue p-3 rounded-xl font-semibold hover:bg-opacity-90 mt-5 mb-4 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>

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
