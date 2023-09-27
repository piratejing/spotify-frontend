// import React, { useEffect, useState } from "react";
// import "./SongCards.css";
// import SongCard from "../SongCard/SongCard";
// import Preloader from "../Preloader/Preloader";
// import spotify from "../../utils/spotify";

// export default function SongCards({ className, api, selectSong, onClick, visibleSongs, showMore }) {
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       const songs = await spotify[api]();
//       setSongs(songs || []);
//     };
//     fetchSongs();
//   }, []);

//   if (!songs.length) {
//     return Preloader();
//   } else {
//     return (
//       <div>
//         <div className={"song-cards " + className}>
//           {(songs.slice(0, visibleSongs) || []).map((song) => (
//             <SongCard song={song} selectSong={selectSong} />
//           ))}
//         </div>
//         <div className="songs__show-more-container">
//           {visibleSongs > 10 ? (
//             <></>
//           ) : (
//             <button type="button" className="songs__show-more-button" onClick={onClick} showMore={showMore}>
//               Show More...
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

import React, { useEffect, useState } from "react";
import "./SongCards.css";
import SongCard from "../SongCard/SongCard";
import Preloader from "../Preloader/Preloader";
import spotify from "../../utils/spotify";

export default function SongCards({ className, api, selectSong, visibleSongs, showMore }) {
  const [songs, setSongs] = useState([]);

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
