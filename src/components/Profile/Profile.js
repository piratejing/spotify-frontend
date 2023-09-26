import React from "react";
import "./Profile.css";

// export default function Profile() {
//   const [topSongs, setTopSongs] = useState([]);

//   useEffect(() => {
//     const fetchTopSongs = async () => {
//       const songs = await spotify.topSongs();
//       setTopSongs(songs?.items || []);
//     };
//     fetchTopSongs();
//   }, []);

//   return (
//     <div>
//       <div>
//         {(topSongs.slice(0, 10) || []).map((song) => (
//           <SongCard song={song} />
//         ))}
//       </div>
//     </div>
//   );
// }
