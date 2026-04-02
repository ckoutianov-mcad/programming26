import { Link, useParams } from "react-router-dom";
import musicData from "../assets/music.json";

export function Songs() {
    const { slug } = useParams();
    const selectedSong = musicData.songs.find((song) =>
    song.slug === slug);

    return (
    <>
    <nav><Link to="/">Return to Home</Link>
    </nav>
    <div className="selectedSong">
        <h2>{selectedSong.title}</h2>
        <img src={selectedSong.cover} alt={selectedSong.title} />
        <p>Artist: {selectedSong.artist}</p>
        <p>Rank: {selectedSong.rank}</p>
        <p>Weeks On Chart: {selectedSong.position.weeksOnChart}</p>
        </div>
    </>
    )
}
