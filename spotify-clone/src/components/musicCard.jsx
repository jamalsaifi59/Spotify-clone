import React from "react";

const MusicCard = ({ song }) => {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition">
      <img
        src={song.image}
        alt={song.title}
        className="w-full rounded-lg"
      />

      <h3 className="text-white font-semibold mt-3">
        {song.title}
      </h3>

      <p className="text-gray-400 text-sm">
        {song.artist}
      </p>
    </div>
  );
};

export default MusicCard;