import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import spotify from "../../utils/spotify";

export default function Navigation({ loggedIn, username }) {
  if (loggedIn) {
    return (
      <div className="navbar">
        <div className="navbar__container">
          <Link to="/" className="navbar__link">
            {username}
          </Link>
          <Link to="/top-songs" className="navbar__link">
            Top 10 Artists
          </Link>
          <Link to="/top-10-recommend" className="navbar__link">
            Top 10 Recommended
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <p></p>
      </div>
    );
  }
}
