import React, { useEffect, useState } from "react";
import "./SongCards.css";
import SongCard from "../SongCard/SongCard";
import Preloader from "../Preloader/Preloader";
import spotify from "../../utils/spotify";

export default function SongCards({ className, api, selectSong }) {
  const [songs, setSongs] = useState([]);

  console.log(selectSong);

  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await spotify[api]();
      setSongs(songs || []);
    };
    fetchSongs();
  }, []);

  if (!songs.length) {
    return Preloader();
  } else {
    return (
      <div className={"song-cards " + className}>
        {(songs.slice(0, 10) || []).map((song) => (
          <SongCard song={song} selectSong={selectSong} />
        ))}
      </div>
    );
  }
}
