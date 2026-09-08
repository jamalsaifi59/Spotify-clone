import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/playerContext.jsx";
import Login from "../components/Loging.jsx";
import Signup from "./SignUp.jsx";

function Display() {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef(null);
  const location = useLocation();

  const isAlbum = location.pathname.startsWith("/album/");

  const albumId = isAlbum
    ? location.pathname.split("/").pop()
    : "";

  const currentAlbum = albumsData.find(
    (album) => album._id === albumId
  );

  const bgColor = currentAlbum?.bgColour || "#121212";

  useEffect(() => {
    if (!displayRef.current) return;

    if (isAlbum) {
      displayRef.current.style.background =
        `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />

        <Route
          path="/album/:id"
          element={<DisplayAlbum album={currentAlbum} />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default Display;

// import { Route, Routes, useLocation } from "react-router-dom";
// import DisplayHome from "./DisplayHome.jsx";
// import DisplayAlbum from "./DisplayAlbum.jsx";
// import { useContext, useEffect, useRef } from "react";
// import { PlayerContext } from "../context/playerContext.jsx";
// import Login from "../components/Loging.jsx";
// import Signup from "./SignUp.jsx";

// function Display() {
//   const { albumsData } = useContext(PlayerContext);

//   const displayRef = useRef();
//   const location = useLocation();
//   const isAlbum = location.pathname.includes("album");
//   const albumId = isAlbum ? location.pathname.split("/").pop() : "";
//   const bgColor =
//     isAlbum && albumsData.length > 0
//       ? albumsData.find((album) => album._id === albumId).bgColour
//       : "#121212";

//   useEffect(() => {
//     if (isAlbum) {
//       displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
//     } else {
//       displayRef.current.style.background = `#121212`;
//     }
//   }, [isAlbum, bgColor]);

//   return (
//     <div
//       ref={displayRef}
//       className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
//       {albumsData.length > 0 ? (
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Signup />} />
//           <Route path="/" element={<DisplayHome />} />
//           <Route path="/album/:id" element={<DisplayAlbum />} />
//           <Route
//             path="/album/:id"
//             element={
//               <DisplayAlbum
//                 album={albumsData.find((album) => album._id == albumId)}
//               />
//             }
//           />
          
          
//         </Routes>
//       ) : null}
//     </div>
//   );
// }

// export default Display;
