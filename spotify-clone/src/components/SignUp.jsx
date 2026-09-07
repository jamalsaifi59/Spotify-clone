import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("signup click button err")
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        {
          fullname,
          username,
          email,
          password,
        }
      );
      console.log("server side response :", response.data)

      if (response.data.success) {
        alert("Signup Successful!");

        // After Signup go to login page
        navigate("/login");
      }
    } catch (error) {
      console.log("signup ERROR :", error)
      console.log("SERVER ERROR :",error.response?.data)
      alert(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 p-8 rounded-lg w-96"
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Sign Up for Spotify
        </h1>

        <input
          type="text"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 mb-4 rounded text-white"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-500 p-3 rounded-full font-bold"
        >
          Sign Up
        </button>

        <p className="text-gray-400 text-center mt-5">
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-green-500 w-full mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Signup;