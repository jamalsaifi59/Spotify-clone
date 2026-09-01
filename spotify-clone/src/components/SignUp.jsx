import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        alert("Signup Successful!");

        // After Signup go to login page
        navigate("/login");
      }
    } catch (error) {
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
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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