import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //get all notes 
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });

    const note = await response.json();


    setNotes(notes.concat(note))

  }
  //delete a Note
  const deleteNote = async (id) => {
    //fetch a note

    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      // body: JSON.stringify({title, description, tag})

    });
    const json = response.json();
    console.log("Delete note is clicked")
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }


  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //fetch a note

    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Login to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);


  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;