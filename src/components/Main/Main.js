import React from "react";
import "./Main.css";
import About from "../About/About";
import musicNote from "../../images/music-note.svg";
import spotify from "../../utils/spotify";

export default function Main({ loggedIn, profileImage }) {
  const button = loggedIn ? (
    <a className="main__login" onClick={() => spotify.logout()}>
      Logout
    </a>
  ) : (
    <a className="main__login" onClick={() => spotify.login()}>
      Login to Spotify
    </a>
  );

  const img = loggedIn && profileImage != "" && profileImage ? profileImage : musicNote;

  return (
    <div>
      <div className="main">
        <img className="main__music-note" src={img}></img>
        {button}
        <p className="main__caption">Login to Spotify to see your Top 12 Played Tracks and get Recommendations based on your Top Tracks</p>
      </div>
      <About />
    </div>
  );
}
