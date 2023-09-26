import React from "react";
import "./Header.css";
import spotifyIcon from "../../images/spotify-icon.svg";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn, username }) {
  return (
    <header className="header">
      <a className="header__icon" href="#">
        <img src={spotifyIcon} alt="spotify icon" />
      </a>
      <Navigation loggedIn={loggedIn} username={username} />
    </header>
  );
}
