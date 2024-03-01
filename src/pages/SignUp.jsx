import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflix from "../assets/image/netfilx.jpg";
import { UserAuth } from "../context/AuthContext";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(email, password);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
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
                <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
                <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="text"
                    placeholder="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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

                  {loading ? (
                    <p className="text-gray-500 font-bold">Loading...</p>
                  ) : (
                    <button className="bg-red-600 py-3 my-6 rounded font-bold">
                      Sign Up
                    </button>
                  )}
                  <div className="flex justify-between items-center cursor-pointer text-sm text-gray-600">
                    <p>
                      <input type="checkbox" className="mr-2" />
                      Remember me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <p className="py-8">
                    <span className="text-gray-600 mr-2">
                      Already subscribed to Netflix?
                    </span>
                    <Link to="/login">Sign In</Link>
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

export default SignUp;
