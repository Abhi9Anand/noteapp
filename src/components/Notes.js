import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import {  useNavigate  } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();

      //react-hooks/exhaustive-deps 
    }
    else{
      navigate("/login")
    }

  }, []);
  const ref = useRef(null)
  const refclose = useRef(null)
  const updateNote = (currentNote) => {
 
    ref.current.click();
    setNote({ id: currentNote._id ,etitle:currentNote.title , edescription: currentNote.description , etag : currentNote.tag});
  }
  const [note ,setNote] = useState({ id: "" ,etitle:'' , edescription:"" ,etag:'' })

  const handleClick = (e) => {
      e.preventDefault()
      refclose.current.click();
      console.log("Udating note")
      editNote(note.id , note.etitle , note.edescription , note.etag)
      props.showAlert("Updated Successfully", "success");
     

  }
  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})

  }
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text" value={note.etag}
                    className="form-control"
                    id="etag"
                    name='etag'
                    onChange={onChange} 
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name='etitle'
                    value={note.etitle}
                    onChange={onChange} 
                    minLength={3} required
                    aria-describedby="emailHelp"
                  />

                </div>
              </form>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  value={note.edescription}
                  className="form-control"
                  id="edescription"
                  name='edescription'
                  onChange={onChange} minLength={5} required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button  ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled= { note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" style={{ backgroundColor: " rgb(177, 81, 190)", color: "aliceblue" }} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">

        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote}  showAlert = {props.showAlert} note={note} />;
          })
        }
      </div>
    </>
  )
}

export default Notes
