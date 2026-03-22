import React, { useContext, useRef, useState, useEffect } from 'react';
import { SongContext } from '../song.context';
import {useSong} from "../Hooks/useSong"

const Player = () => {
    const { song } = useSong();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        if (song?.url && audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
            }
        }
    }, [song]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const skipTime = (amount) => {
        if (audioRef.current) {
            audioRef.current.currentTime += amount;
        }
    };

    const changeSpeed = (e) => {
        const rate = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!song) return <div>No song selected</div>;

    return (
        <div className="music-player" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#222',
            color: '#fff',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
            zIndex: 1000
        }}>
            {/* Song Info */}
            <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                {song.posterurl && (
                    <img 
                        src={song.posterurl} 
                        alt="Poster" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} 
                    />
                )}
                <div>
                    <h4 style={{ margin: 0, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {song.title || "Unknown Title"}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>{song.mood || "Unknown Mood"}</p>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                    <button onClick={() => skipTime(-10)} style={btnStyle}>⏪ 10s</button>
                    <button onClick={togglePlay} style={{ ...btnStyle, fontSize: '20px' }}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button onClick={() => skipTime(10)} style={btnStyle}>10s ⏩</button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                    <span style={{ fontSize: '12px' }}>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        style={{ flex: 1, cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '12px' }}>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Speed Control */}
            <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '12px' }}>Speed:</label>
                <select 
                    value={playbackRate} 
                    onChange={changeSpeed}
                    style={{ background: '#333', color: '#fff', border: '1px solid #555', padding: '2px 5px', borderRadius: '4px' }}
                >
                    <option value="0.5">0.5x</option>
                    <option value="1.0">1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2.0">2.0x</option>
                </select>
            </div>

            <audio
                ref={audioRef}
                src={song.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};

const btnStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '5px'
};

export default Player;