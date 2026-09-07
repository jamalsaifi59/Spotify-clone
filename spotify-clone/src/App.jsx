import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Display from "./components/Display.jsx";
import Player from "./components/Player.jsx";
import Sidebar from "./components/sidebar.jsx";
import Login from "./components/Loging.jsx";
import Signup from "./components/SignUp.jsx";
import AuthRequired from "./components/AuthRequired.jsx";

import { PlayerContext } from "./context/playerContext.jsx";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  // Check if user is logged in
  const token = localStorage.getItem("token");

  return (
    <div className="h-screen bg-black text-white">

      <Routes>

        <Route
          path="/"
          element={token ? <SpotifyHome /> : <AuthRequired />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Signup />} />
         <Route path="/*" element={<Display />} />

      </Routes>

      {token && (
        <audio
          ref={audioRef}
          src={track?.file || undefined}
          preload="none"
        />
      )}

    </div>
  );
};


// Spotify Main Layout
const SpotifyHome = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <>
      {songsData.length > 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>

          <Player />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          Loading songs...
        </div>
      )}
    </>
  );
};

export default App;


// import { useContext } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// import Display from "./components/Display.jsx";
// import Player from "./components/Player.jsx";
// import Sidebar from "./components/sidebar.jsx";
// import Login from "./components/Loging.jsx";

// import { PlayerContext } from "./context/playerContext.jsx";
// import Signup from "./components/SignUp.jsx";
// import AuthRequired from "./components/AuthRequired.jsx";

// const App = () => {
//   const { audioRef, track, songsData } = useContext(PlayerContext);

//   const location = useLocation();

//   // Check if user is on login page
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <div className="h-screen bg-black text-white">

//       {isLoginPage ? (
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<AuthRequired />} />
//           <Route path="/home" element={<Display />} />
//         </Routes>
//       ) : (
//         <>
//           {songsData.length > 0 ? (
//             <>
//               <div className="h-[90%] flex">
//                 <Sidebar />
//                 <Display />
//               </div>

//               <Player />
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               No songs found in database
//             </div>
//           )}
//         </>
//       )}

//       {/* Audio */}
//       <audio
//         ref={audioRef}
//         src={track?.file || undefined}
//         preload="none"
//       />

//     </div>
//   );
// };

// export default App;