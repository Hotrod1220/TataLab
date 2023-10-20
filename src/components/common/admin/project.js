import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Delete } from '../../../data/icons/delete.svg'
import { ReactComponent as Edit } from '../../../data/icons/edit.svg'
import { deleteDoc, doc } from 'firebase/firestore';
import Popup from 'reactjs-popup';
import { database, storage } from '../../../config/firebase';
import { ref, deleteObject } from "firebase/storage";

function Project({ project }) {
    const [open, setOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleDelete = async (id, photo) => {
        const project = doc(database, "projects", id)
        const desertRef = ref(storage, `${photo}`)
        
        try {
            await deleteObject(desertRef)
            await deleteDoc(project)

            setDeleted(true)
            setTimeout(() => {
                setOpen(false)
                navigate("/admin")
            }, 3000)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="three-flex project" key={project.id}>
            <img src={project.photo} alt={project.id} />
            <div className="project__content__admin">
                <p>{project.title}</p>
                <div className='buttons'>
                    <Link to={String(project.id)} className='button__small button--green'>
                        Edit
                        <Edit />
                    </Link>
                    <button onClick={() => setOpen(true)} className='button__small button--red'>
                        Delete
                        <Delete />
                    </button>
                </div>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <div className="popup">
                    {!deleted && !error &&
                        <div>
                            <h3>Are you sure you want to delete '{project.title}'?</h3>
                            <div className='buttons'>
                                <button onClick={() => handleDelete(project.id, project.photo)} className='button__small button--red'>
                                    Delete
                                    <Delete />
                                </button>
                                <button onClick={() => setOpen(false)} className='button__small button--green__important'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    }
                    {deleted &&
                        <div>
                            <h3>{project.title} has been removed.</h3>
                            <p>Redirecting back to Admin</p>
                        </div>
                    }
                    {error &&
                        <div>
                            <h3>Error:</h3>
                            <p>{error}</p>
                        </div>
                    }
                </div>
            </Popup>
        </div>
    )
}

export default Project;