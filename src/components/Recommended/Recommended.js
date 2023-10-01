import SongCards from "../SongCards/SongCards";

export default function Recomended({ selectSong, showMore, visibleSongs }) {
  return <SongCards className="recommended" api="recommended" selectSong={selectSong} showMore={showMore} visibleSongs={visibleSongs} />;
}
