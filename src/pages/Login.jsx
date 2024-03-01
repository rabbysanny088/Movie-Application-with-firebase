import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflix from "../assets/image/netfilx.jpg";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user, SignIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await SignIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={netflix}
          alt=""
        />
        <div className="bg-black/60 top-0 left-0 w-full h-screen fixed text-center">
          <div className="fixed w-full px-4 py-4 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-bold mb-2">Sign In</h1>
                {error ? <p className="bg-red-500 py-2">{error}</p> : null}
                <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="email"
                    placeholder="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="bg-red-600 py-3 my-6 rounded font-bold">
                    Sign In
                  </button>
                  <div className="flex justify-between items-center cursor-pointer text-sm text-gray-600">
                    <p>
                      <input type="checkbox" className="mr-2" />
                      Remember me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <p className="py-8">
                    <span className="text-gray-600 mr-2">New to Netflix?</span>
                    <Link to="/signup">Sign Up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
