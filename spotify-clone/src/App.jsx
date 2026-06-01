import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import songs from "./data/songs";

function App() {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-zinc-800 to-black">
        <Navbar />

        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-6">
            Recently Played
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {songs.map((song) => (
              <MusicCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;