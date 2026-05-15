import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import '../styles/player.scss'
import { SongContext } from '../song.context'

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const Player = ({ song: songProp }) => {
  const context = useContext(SongContext)
  const song = songProp || context?.songs || null
  const loading = context?.loading || false
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)

  const moodLabel = useMemo(() => {
    if (!song?.mood) return 'Unknown'
    return song.mood.charAt(0).toUpperCase() + song.mood.slice(1)
  }, [song?.mood])

  // Reset and prepare new song, then auto-play
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    console.log('Song changed:', { title: song?.title, url: song?.url, mood: song?.mood })
    
    audio.volume = volume
    audio.pause()
    audio.currentTime = 0
    setProgress(0)
    setIsPlaying(false)
    
    // Auto-play when a new song URL is loaded (mood detected scenario)
    if (song?.url && !loading) {
      console.log('Setting auto-play for new song')
      setShouldAutoPlay(true)
    }
  }, [song?.url, song?.mood, loading])

  // Auto-play when audio is ready
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !shouldAutoPlay || !song?.url) return

    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.error("Auto-play failed:", err)
      }
      setShouldAutoPlay(false)
    }

    // Try to play immediately if ready, otherwise wait for loadedmetadata
    if (audio.readyState >= 2) {
      playAudio()
    } else {
      const handleLoadedMetadata = () => {
        playAudio()
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    }

    return () => {
      audio.removeEventListener('loadedmetadata', () => {})
    }
  }, [shouldAutoPlay, song?.url])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !song?.url) return

    if (audio.paused) {
      await audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (event) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const nextTime = (Number(event.target.value) / 100) * duration
    audio.currentTime = nextTime
    setProgress(Number(event.target.value))
  }

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value)
    setVolume(nextVolume)

    if (audioRef.current) {
      audioRef.current.volume = nextVolume
    }
  }

  return (
    <section className="player-shell">
      <div className="player-panel">
        <div className="player-visual">
          <div className="player-artwork">
            {song?.posterUrl ? (
              <img src={song.posterUrl} alt={song?.title || 'Album artwork'} />
            ) : (
              <div className="player-artwork-fallback">No artwork</div>
            )}
            <div className="artwork-glow" />
          </div>

          <div className="now-playing-badge">Now Playing</div>
        </div>

        <div className="player-content">
          <div className="player-header">
            <span className="player-kicker">Mood player</span>
            <span className="mood-pill">{moodLabel}</span>
          </div>

          <div className="player-copy">
            <h1>{loading ? 'Loading song...' : (song?.title || 'Detect your mood to start listening')}</h1>
            <p>
              {loading 
                ? 'Fetching a track that matches your mood...'
                : 'A focused playback surface for the current song, built to keep the cover art, mood, and controls in one place.'
              }
            </p>
          </div>

          <div className="player-progress-card">
            <div className="player-times">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              className="player-range"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(90deg, #f97316 ${progress}%, rgba(255,255,255,0.12) ${progress}%)`
              }}
            />

            <div className="player-controls-row">
              <button className="player-icon-button secondary" type="button" disabled>
                Previous
              </button>
              <button
                className="player-icon-button primary"
                type="button"
                onClick={togglePlay}
                disabled={!song?.url || loading}
              >
                {loading ? 'Loading...' : (isPlaying ? 'Pause' : 'Play')}
              </button>
              <button className="player-icon-button secondary" type="button" disabled>
                Next
              </button>
            </div>
          </div>

          <div className="player-footer">
            <div className="player-meta">
              <span className="meta-label">Volume</span>
              <input
                className="volume-range"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>

            <div className="player-meta compact">
              <span className="meta-label">Status</span>
              <strong>
                {loading 
                  ? 'Fetching...' 
                  : (song?.url 
                    ? (isPlaying ? '▶ Playing' : '⏸ Ready') 
                    : 'No track'
                  )
                }
              </strong>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={song?.url || undefined}
          preload="metadata"
          crossOrigin="anonymous"
          onLoadedMetadata={(event) => {
            console.log('Audio loaded:', event.currentTarget.duration)
            setDuration(event.currentTarget.duration || 0)
          }}
          onTimeUpdate={(event) => {
            const currentDuration = event.currentTarget.duration || 0
            if (!currentDuration) return
            setProgress((event.currentTarget.currentTime / currentDuration) * 100)
          }}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onError={(e) => {
            console.error('Audio error:', e.currentTarget.error?.message)
          }}
          onCanPlay={() => console.log('Audio ready to play')}
        />
      </div>
    </section>
  )
}

export default Player