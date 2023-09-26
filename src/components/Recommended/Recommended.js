import React, { useEffect, useState } from "react";
import "./Recommended.css";
import SongCards from "../SongCards/SongCards";

export default function Recomended({ selectSong }) {
  return <SongCards className="recommended" api="recommended" selectSong={selectSong} />;
}
