import React, { useEffect, useState } from "react";
import "./SongCards.css";
import SongCard from "../SongCard/SongCard";
import Preloader from "../Preloader/Preloader";
import spotify from "../../utils/spotify";

export default function SongCards({ className, api, selectSong, visibleSongs, showMore }) {
  const [songs, setSongs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await spotify[api]();
        setSongs(songs || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchSongs();
  }, [api]);

  if (errorMessage) {
    return (
      <div className="error__message-container">
        <p className="error__message">
          Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later or return
          to the main page and try to login again.
        </p>
      </div>
    );
  }

  if (!songs.length) {
    return Preloader();
  } else {
    return (
      <div>
        <div className={"song-cards " + className}>
          {(songs.slice(0, visibleSongs) || []).map((song) => (
            <SongCard key={song.trackId} song={song} selectSong={selectSong} />
          ))}
        </div>
        <div className="songs__show-more-container">
          {visibleSongs < 10 ? (
            <button type="button" className="songs__show-more-button" onClick={showMore}>
              Show More...
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
