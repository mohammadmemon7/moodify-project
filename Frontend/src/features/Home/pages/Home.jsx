import React, { useEffect } from 'react'
import FaceExpression from '../../expressions/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../Hooks/useSong'
import "../styles/Home.scss"

const Home = () => {
    const { 
        loading, 
        handleGetsong, 
        song, 
        setsong,
        playlist, 
        allSongs, 
        handleGetAllSongs 
    } = useSong();

    useEffect(() => {
        handleGetAllSongs();
    }, []);

    return (
        <div className="home-page">
            {/* Header */}
            <header className="home-header">
                <div className="logo">MOODIFY</div>
                <div className="header-status">
                    {loading ? "Fetching song..." : song ? `Now playing · ${song.mood}` : "Scan your mood to begin"}
                </div>
            </header>

            {/* 3 column layout */}
            <div className="home-content">

                {/* LEFT — Mood Scanner */}
                <div className="col col-scanner">
                    <div className="section-label">MOOD SCANNER</div>
                    <FaceExpression onClick={(expression) => handleGetsong({ mood: expression })} />
                </div>

                {/* CENTER — Player */}
                <div className="col col-player">
                    <div className="section-label">NOW PLAYING</div>
                    {song ? <Player /> : (
                        <div className="empty-player">
                            <div className="empty-icon">♪</div>
                            <p>Scan your face to get a song</p>
                        </div>
                    )}

                    {/* Mood Playlist below player */}
                    {playlist && playlist.length > 0 && (
                        <div className="mood-playlist">
                            <div className="section-label" style={{ marginTop: "24px" }}>
                                {song?.mood?.toUpperCase()} PLAYLIST &middot; {playlist.length} songs
                            </div>
                            <div className="playlist-list">
                                {playlist.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className={`playlist-item ${song?._id === item._id ? "active" : ""}`}
                                        onClick={() => {
                                            setsong(item);
                                            window.dispatchEvent(new Event('autoplay-song'));
                                        }}
                                    >
                                        <div className="playlist-num">{index + 1}</div>
                                        <img src={item.posterurl} alt={item.title} className="playlist-thumb" />
                                        <div className="playlist-info">
                                            <div className="playlist-title">{item.title}</div>
                                            <div className="playlist-mood">{item.mood}</div>
                                        </div>
                                        {song?._id === item._id && <div className="playing-indicator">▶</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT — All Songs Library */}
                <div className="col col-library">
                    <div className="section-label">LIBRARY &middot; {allSongs.length} songs</div>
                    <div className="library-list">
                        {allSongs.map((item) => (
                            <div
                                key={item._id}
                                className={`library-item ${song?._id === item._id ? "active" : ""}`}
                                onClick={() => {
                                    setsong(item);
                                    window.dispatchEvent(new Event('autoplay-song'));
                                }}
                            >
                                <img src={item.posterurl} alt={item.title} className="library-thumb" />
                                <div className="library-info">
                                    <div className="library-title">{item.title}</div>
                                    <div className={`library-mood-tag mood-${item.mood}`}>{item.mood}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
