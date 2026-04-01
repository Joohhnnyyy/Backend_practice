import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([]);


  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes()
  }, []);


function handelSubmit(e){
  e.preventDefault()
  const title = e.target.elements.title.value
  const description = e.target.elements.description.value
  console.log(title,description)
  axios.post("http://localhost:3000/api/notes",{
    title: e.target.elements.title.value,
    description: e.target.elements.description.value
  })
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
}
function deletingNotes(Noteid){
  console.log(Noteid)
  axios.delete("http://localhost:3000/api/notes/"+Noteid)
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
}
// function updateNotes(Noteid){
//   console.log(Noteid)
//   axios.patch("http://localhost:3000/api/notes/"+Noteid)
// }
function handelUpdate(e,Noteid){
  e.preventDefault()
  const { update } = e.target.elements
  console.log(update.value)
  axios.patch("http://localhost:3000/api/notes/"+Noteid,{
    description:update.value
  })
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
}
  return (
    <>

      <div className='notes bg-gray-600 p-4 rounded-4xl h-500 w-full  flex gap-4 flex-col '>
    <form onSubmit={handelSubmit} className='bg-green-400 h-20 w-full rounded-4xl flex items-center'>
      <input type="text" name='title' placeholder='Title' />
      <input type="text" name='description'placeholder='Description' />
      <button className='bg-red-200 px-3 py-2 rounded-3xl'>Create Note</button>
    </form>
        {notes.map(note => {
          return <div key={note._id} className='note bg-gray-400 rounded-4xl flex justify-center flex-col items-center h-30 gap-4 flex-wrap' >
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick ={()=>{deletingNotes(note._id)}}className='bg-white px-3 py-2 rounded-3xl'>Delete</button>
            <form onSubmit={(e)=>{handelUpdate(e,note._id)}}>
              <input type="text" name='update' placeholder='New desc the text' />
              <button   className='bg-white px-3 py-2 rounded-3xl'>Update</button>
            </form>
          </div>

        })
        }
      </div>

    </>
  )
}

export default App