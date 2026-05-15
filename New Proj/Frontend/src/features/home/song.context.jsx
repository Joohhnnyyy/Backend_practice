import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongProvider = ({children}) => {
  const [songs , setSongs] = useState({
        "url": "https://ik.imagekit.io/c0h1max8p/MyProject/moodify/songs/Dastaan-E-Om_Shanti_Om__Lyrical__Om_Shanti_Om___Shahrukh_Khan___Vishal-Shekhar___Shaan__Javed_Akhtar_2lZyxlHX9.mp3",
        "posterUrl": "https://ik.imagekit.io/c0h1max8p/MyProject/moodify/posters/Dastaan-E-Om_Shanti_Om__Lyrical__Om_Shanti_Om___Shahrukh_Khan___Vishal-Shekhar___Shaan__Javed_Akhtar_KIh4hP5cE.jpeg",
        "title": "Dastaan-E-Om Shanti Om (Lyrical) Om Shanti Om | Shahrukh Khan | Vishal-Shekhar | Shaan |Javed Akhtar",
        "mood": "angry",
    });

    const [loading , setLoading] = useState(false)

  return (
    <SongContext.Provider value={{songs , setSongs , loading , setLoading}}>
      {children}
    </SongContext.Provider>
  )
}
