import React, { useEffect, useState } from "react";
import "./TopSongs.css";
import SongCards from "../SongCards/SongCards";

export default function TopSongs({ selectSong, showMore, visibleSongs }) {
  return <SongCards className="top-songs" api="topArtists" selectSong={selectSong} showMore={showMore} visibleSongs={visibleSongs} />;
}
