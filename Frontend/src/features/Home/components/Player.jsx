import React, { useContext, useRef, useState, useEffect } from 'react';
import { SongContext } from '../song.context';
import { useSong } from "../Hooks/useSong";
import "../styles/Player.scss";

const Player = () => {
    const { song } = useSong();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        const handleAutoplay = () => {
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.error("Autoplay failed:", e));
            }
        };

        window.addEventListener('autoplay-song', handleAutoplay);
        return () => window.removeEventListener('autoplay-song', handleAutoplay);
    }, []);

    useEffect(() => {
        if (song?.url && audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
            setIsPlaying(true);
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

    if (!song) return null;

    return (
        <div className="player-card">
            <div className="player-artwork">
                {song.posterurl && (
                    <img
                        src={song.posterurl}
                        alt="Poster"
                    />
                )}
                <div className="artwork-overlay"></div>
                <div className="mood-tag">
                    {song.mood}
                </div>
            </div>

            <div className="player-info">
                <h3 className="song-title">
                    {song.title || "Unknown Title"}
                </h3>
            </div>

            <div className="player-progress">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                />
                <div className="time-row">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="player-controls">
                <button onClick={() => skipTime(-10)} className="ctrl-btn">−10s</button>
                <button onClick={togglePlay} className="ctrl-btn primary">
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={() => skipTime(10)} className="ctrl-btn">+10s</button>

                <select
                    value={playbackRate}
                    onChange={changeSpeed}
                    className="speed-select"
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

export default Player;
