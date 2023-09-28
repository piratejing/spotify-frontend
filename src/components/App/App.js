import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import TopSongs from "../TopSongs/TopSongs";
import Recommended from "../Recommended/Recommended";
import SongModal from "../SongModal/SongModal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, HashRouter, Switch } from "react-router-dom";
import spotify from "../../utils/spotify";
import "./App.css";
import "../../vendor/fonts.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [visibleSongs, setVisibleSongs] = useState(3);

  const showMore = () => {
    setVisibleSongs((prevVisibleSongs) => prevVisibleSongs + 3);
  };

  const selectSong = (song) => {
    setActiveModal(song);
  };
  useEffect(() => {
    const fetchUser = async () => {
      spotify.onLogIn = setLoggedIn;
      await spotify.init();
      const profile = await spotify.profile();
      if (profile?.display_name) {
        setUserName(profile.display_name);
        setProfileImage(profile.images[0].url);
      }
    };
    fetchUser();
  });
  const handleCloseModal = () => {
    setActiveModal(null);
  };
  // Close modal popup with OutsideClick
  useEffect(() => {
    const closeByOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", closeByOutsideClick);
    return () => document.removeEventListener("mousedown", closeByOutsideClick);
  }, []);
  return (
    <HashRouter>
      <div className="App">
        <Header loggedIn={loggedIn} username={username} />
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} profileImage={profileImage} />
          </Route>
          <Route path="/top-songs">
            <TopSongs
              selectSong={selectSong}
              onClick={() => setVisibleSongs((prevVisibleSongs) => prevVisibleSongs + 3)}
              visibleSongs={visibleSongs}
              showMore={showMore}
            />
          </Route>
          <Route path="/top-10-recommend">
            <Recommended
              selectSong={selectSong}
              onClick={() => setVisibleSongs((prevVisibleSongs) => prevVisibleSongs + 3)}
              visibleSongs={visibleSongs}
              showMore={showMore}
            />
          </Route>
        </Switch>
        {activeModal ? <SongModal song={activeModal} onClose={handleCloseModal} /> : ""}
        <Footer />
      </div>
    </HashRouter>
  );
}
export default App;
