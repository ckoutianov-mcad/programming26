import { Link } from 'react-router-dom';
import musicData from "../assets/music.json"

export function Home() {
    return (
        <>
        {musicData.songs.map((song) => {
        return (
            <div key={song.slug}>
            <img src={song.cover} alt={song.title} />
            <p><Link to={`${song.slug}`}>{song.title} by {song.artist}</Link></p>
            </div>
        )
        })}
        </>
    )
}