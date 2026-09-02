import { useNavigate } from "react-router-dom";

const AuthRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-xl text-center">

        <h1 className="text-4xl font-bold mb-4">
          Welcome to Spotify 🎵
        </h1>

        <p className="text-gray-400 mb-8">
          Please Login or Signup to listen to your favorite songs.
        </p>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-full"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full border border-gray-500 hover:border-white text-white font-bold py-3 rounded-full"
          >
            Sign Up
          </button>

        </div>

      </div>
    </div>
  );
};

export default AuthRequired;