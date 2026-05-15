import React, { useContext } from 'react'
import FaceExpression from '../../Expression/pages/FaceExpression'
import Player from '../components/Player'
import { SongContext } from '../song.context'
import { useSong } from '../hooks/useSong'

const Home = () => {
  const context = useContext(SongContext)
  const { handleGetSong } = useSong()

  const handleMoodDetected = async (mood) => {
    console.log("Mood detected:", mood)
    try {
      await handleGetSong({ mood })
    } catch (err) {
      console.error("Failed to fetch song for mood:", err)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '32px' }}>
      <FaceExpression onMoodDetected={handleMoodDetected} />
      <Player />
    </div>
  )
}

export default Home