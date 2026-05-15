import { getSong } from "../service/song.api";  
import { createContext, useContext, useState } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
  const context = useContext(SongContext)
  const { songs , setSongs , loading , setLoading } = context

  async function handleGetSong({mood}){
    setLoading(true)
    try{
      const data = await getSong({mood})
      console.log('API response:', data)
      // Extract song object from response (backend returns { message, song })
      const songData = data.song || data
      console.log('Setting song:', songData)
      setSongs(songData)
      setLoading(false)
    }
    catch(err){
      console.error('Failed to get song:', err)
      setLoading(false)
    }
  }
  return { songs , setSongs , loading , setLoading , handleGetSong }
}