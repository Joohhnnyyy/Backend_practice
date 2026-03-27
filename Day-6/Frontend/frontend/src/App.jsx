import React from 'react'
import { useState ,useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [notes, setNotes] = useState([]);


    useEffect(() => {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes); 
      });
  }, []);

  return (
    <>


      <div className='notes bg-gray-600 p-4 rounded-4xl h-500 w-full  flex gap-4'>

        {notes.map(note => {
          return <div  key={note._id} className='note bg-gray-400 rounded-4xl flex justify-center flex-col items-center h-30 gap-4 flex-wrap' >
            <h1>{note.title}</h1>
            <p>{note.description}</p>

          </div>

        })
        }
      </div>

    </>
  )
}

export default App