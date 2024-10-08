import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note ,setNote] = useState({title:'' , description:"" ,tag:'' })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title , note.description , note.tag);
        setNote({title:'' , description:"" ,tag:'' })
        props.showAlert("Added Successfully" , "success")

    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})

    }
    return (
        <>
            <div className="container my-3">
            <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name='tag'
                            value={note.tag}
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
                            id="title"
                            name='title'
                            value={note.title}
                            onChange={onChange}
                            minLength={3} required
                            aria-describedby="emailHelp"
                        />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={note.description}
                            name='description'
                            onChange={onChange} minLength={5} required
                        />
                    </div>

                    <button disabled = { note.title.length<3 || note.description.length<5} type="submit" className="btn " style={{ backgroundColor: " rgb(177, 81, 190)", color: "aliceblue" }} onClick={handleClick}>
                        Add Note
                    </button>
                </form>

            </div>
            <div className="container">


            </div>
        </>
    )
}

export default AddNote
